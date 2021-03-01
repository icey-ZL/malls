<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control ref="tabControl1"
                 class="tab-none"
                 :titles="['流行','精选','新款']"
                 @tabClick="tabClick"
                 v-show="isTabfixed"></tab-control>
    <!--<div class="down-load">&lt;!&ndash;@click="loadMore" &ndash;&gt;-->
      <!--下拉刷新...-->
    <!--</div>-->
    <scroll class="scroll-content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up="true"
            @pullingUp="showLoad"
            @pullingDown="showRefresh">
        <home-swiper :banner="banner" class="home-swiper" @swiperImgLoad.once="swiperImgLoad"></home-swiper>
        <home-recommend :recommend="recommend"></home-recommend>
        <tab-control ref="tabControl2"
                     :titles="['流行','精选','新款']"
                     @tabClick="tabClick"
                     v-show="!isTabfixed"></tab-control>
        <goods-list :goods="showGoods" ></goods-list>
        <div class="show-load"
             v-show="isShowLoad"><!--@click="loadMore" -->
          没有更多了...
        </div>
    </scroll>
    <back-top @backTop="backTop" v-show="showBackTop"></back-top>

  </div>


</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import scroll from 'components/common/scroll/scroll'
  import TabControl from 'components/content/TabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import {debounce} from '@/common/utils'
  import {backTopMixin,itemListenerMinxin} from '@/common/mixin'


  import {
    getHomeMultidata,
    getHomeGoods
  } from 'network/home';

  import HomeSwiper from './childrenComponent/HomeSwiper'
  import HomeRecommend from './childrenComponent/HomeRecommend'



  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommend,
      TabControl,
      GoodsList,
      scroll,
    },
    mixins:[backTopMixin,itemListenerMinxin],
    data(){
      return{
        banner:[],
        recommend:[],
        goods:{
          'pop':{page:0,list:[]},
          'sell':{page:0,list:[]},
          'new':{page:0,list:[]},
        },
        currentType:'pop',
        isShow:false,
        isShowLoad:true,
        tabOffsetTop:0,
        isTabfixed:false,
        isLoads:false,
      }
    },
    created() {
      //请求多个数据
      this.getHomeMultidata()

      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('sell')
      this.getHomeGoods('new')

    },

    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      },
    },
    activated(){

    },
    deactivated(){
      this.$bus.$off('onload',this.imgListener)
    },
    methods:{
      //事件监听相关方法
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'sell'
            break
          case 2:
            this.currentType = 'new'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      contentScroll(position){
        //控制backtop按钮出现和消失,这里不能抽离混入，除非再起新的方法
          this.showBackTop=  (-position.y) > 1000

        //决定tabControl是否吸顶（position：fiexd）
          this.isTabfixed = (-position.y) > (this.tabOffsetTop)
      },
      // loadMore(){
      //  // console.log(this.$refs.scroll);
      //   this.getHomeGoods(this.currentType)
      // },
      showLoad(){
        // this.isShowLoad=true
        this.getHomeGoods(this.currentType)
      },
      showRefresh(){
        window.location.reload()
      },
      swiperImgLoad(){
        //获取tabControl的offsetTop
        // console.log(this.$refs.tabControl2.$el.offsetTop);
        // console.log(this.$refs.tabControl2.$el.offsetHeight);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop - this.$refs.tabControl2.$el.offsetHeight
      },



      //网络请求相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          //保存结果
          //created的外层作用域是组件实例
          this.banner = res.data.banner.list
          this.recommend = res.data.recommend.list
        }).catch(err => err)
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
         // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        }).catch(err => err)
       }
    },
    updated(){
      this.$refs.scroll.refresh()

    },
    mounted() {
      this.$bus.$on('onload',this.imgListener)
    }
  }
</script>

<style scoped>
  .home-nav{
    color: var(--color-background);
    background: var(--color-tint);
    z-index: 10;
  }

  .home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  /*.tab-control{*/
    /*!*自动转换static和fixed*!*/
    /*position: sticky;*/
    /*top:44px;*/
  /*}*/
  .scroll-content{
    /*position: absolute;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top:44px;*/
    /*bottom: 49px;*/

    overflow: hidden;
    height: calc(100vh - 93px);
    /*padding-bottom: 49px;*/

  }
  .show-load{
    text-align: center;
    font-size: 12px;

    /*手机浏览器测试*/
    /*padding-bottom: 100px;*/
  }
  .down-load{
    text-align: center;
    font-size: 12px;
    position: fixed;
    left: 0;
    right: 0;
    padding: 5px;
  }


</style>

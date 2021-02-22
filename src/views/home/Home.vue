<template>
  <div class="home">
    <nav-bar>
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="scroll-content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <home-swiper :banner="banner" class="home-swiper"></home-swiper>
        <home-recommend :recommend="recommend"></home-recommend>
        <tab-control class="tab-control"
                     :titles="['流行','精选','新款']"
                     @tabClick="tabClick"></tab-control>
        <goods-list :goods="showGoods" ></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>

  </div>


</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import scroll from 'components/common/scroll/scroll'
  import TabControl from 'components/content/TabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import backTop from 'components/content/backTop/backTop'

  import {
    getHomeMultidata,
    getHomeGoods
  } from 'network/home';

  import HomeSwiper from './childrenCompnent/HomeSwiper'
  import HomeRecommend from './childrenCompnent/HomeRecommend'




  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommend,
      TabControl,
      GoodsList,
      scroll,
      backTop,
    },
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
        isShow:false
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
    mounted(){

    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
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
      },
      backClick(){
         this.$refs.scroll.scrollTo(0,0,500)
        // console.log(this.$refs.scroll.scroll);
      },
      contentScroll(position){
          this.isShow =  (-position.y) > 1000
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
  .tab-control{
    /*自动转换static和fixed*/
    position: sticky;
    top:44px;
  }
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

</style>

<template>
    <div id="detail">
      <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
      <scroll class="content"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScroll">
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @infoImgLoad="infoImgLoad"></detail-goods-info>
        <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
        <goods-list ref="recommends" :goods="recommends"></goods-list>
      </scroll>
      <back-top @backTop="backTop" v-show="showBackTop"></back-top>
    </div>
</template>

<script>
  import scroll from 'components/common/scroll/scroll'

  import detailNavBar from './childrenComponent/detailNavBar'
  import detailSwiper from './childrenComponent/detailSwiper'
  import detailBaseInfo from './childrenComponent/detailBaseInfo'
  import detailShopInfo from  './childrenComponent/detailShopInfo'
  import detailGoodsInfo from './childrenComponent/detailGoodsInfo'
  import detailParamInfo from './childrenComponent/detailParamInfo'
  import detailCommentInfo from './childrenComponent/detailCommentInfo'
  import GoodsList from 'components/content/goods/GoodsList'
  import backTop from 'components/content/backTop/backTop'

  import {getDetail,GoodsInfo,GoodsParam,Shop,getRecommend} from "../../network/detail";
  import {backTopMixin,itemListenerMinxin} from '@/common/mixin'


  export default {
    name: "detail",
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        detailImages:[],
        recommends:[],
        themeTopY:[],
        currentIndex:null,

      }
    },
    mixins: [backTopMixin,itemListenerMinxin],
    methods:{
      //最后一张图片加载完刷新
      infoImgLoad(){
       this.$refs.scroll.refresh()
        this.themeTopY=[]
        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.param.$el.offsetTop )
        this.themeTopY.push(this.$refs.comment.$el.offsetTop )
        this.themeTopY.push(this.$refs.recommends.$el.offsetTop )
        this.themeTopY.push(Number.MAX_VALUE)

      },
      contentScroll(position){
        //控制backtop按钮出现和消失
        this.showBackTop =  (-position.y) > 1000

        const positionY = -position.y
        //console.log(positionY);
        //   条件1：防止赋值过程过于频繁
        //   条件2.1：判断区间在0和某个数字之间
        //   条件2.2：判断大于等于最后一个数字
        //hack写法：空间换时间
        for(let i=0;i<this.themeTopY.length-1;i++){
          if(this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])){
                this.currentIndex = i
                this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        // for(let i in this.themeTopY){
        //   let len = this.themeTopY.length
        //   i=i*1
        //   if(this.currentIndex !== i &&
        //     (( i< len-1 && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1]) ||
        //      (i===len-1 && positionY >= this.themeTopY[i])) ){
        //     this.currentIndex = i
        //     this.$refs.nav.currentIndex = this.currentIndex
        //   }
        // }
      },
      titleClick(index){
       // console.log(index);

        this.$refs.scroll.scrollTo(0,-this.themeTopY[index],100)
      }
    },
    components:{
      detailNavBar,
      detailSwiper,
      detailBaseInfo,
      detailShopInfo,
      detailGoodsInfo,
      detailParamInfo,
      detailCommentInfo,
      scroll,
      GoodsList,
      backTop
    },
    created() {
      //保存iid
      this.iid = this.$route.params.iid
      //根据iid请求商品详情数据
      getDetail(this.iid).then(res=>{
        const data = res.result
        //获取顶部图片轮播数据
        this.topImages = data.itemInfo.topImages
        //获取商品信息
        this.goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
        //获取店铺信息
        this.shop = new Shop(data.shopInfo);
        //保存商品详细信息
        this.detailInfo = data.detailInfo
        //保存参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        //保存评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }

      })
      //请求商品推荐数据
      getRecommend().then(res=>{
        this.recommends = res.data.list
      })
    },
    mounted(){
      this.$bus.$on('onload',this.imgListener)
    },
    updated() {
      this.$refs.scroll.refresh()
      this.themeTopY=[]
      this.themeTopY.push(0)
      this.themeTopY.push(this.$refs.param.$el.offsetTop )
      this.themeTopY.push(this.$refs.comment.$el.offsetTop )
      this.themeTopY.push(this.$refs.recommends.$el.offsetTop )
      this.themeTopY.push(Number.MAX_VALUE)

    },
    computed:{

    },

    destroyed(){
      this.$bus.$off('onload',this.imgListener)
    },
  }
</script>

<style scoped>
  #detail{
    padding-top: 44px;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100vh - 44px);
    overflow: hidden;
  }

</style>

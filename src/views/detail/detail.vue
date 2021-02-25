<template>
    <div id="detail">
      <detail-nav-bar></detail-nav-bar>
      <scroll class="content"
      ref="scroll">
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @infoImgLoad="infoImgLoad"></detail-goods-info>
      </scroll>

    </div>
</template>

<script>
  import scroll from 'components/common/scroll/scroll'

  import detailNavBar from './childrenComponent/detailNavBar'
  import detailSwiper from './childrenComponent/detailSwiper'
  import detailBaseInfo from './childrenComponent/detailBaseInfo'
  import detailShopInfo from  './childrenComponent/detailShopInfo'
  import detailGoodsInfo from './childrenComponent/detailGoodsInfo'

  import {getDetail,GoodsInfo,GoodsParam,Shop} from "../../network/detail";


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
        detailImages:[]

      }
    },
    methods:{
      //最后一张图片加载完刷新
      infoImgLoad(){
       this.$refs.scroll.refresh()
      }
    },
    components:{
      detailNavBar,
      detailSwiper,
      detailBaseInfo,
      detailShopInfo,
      detailGoodsInfo,
      scroll,
    },
    created() {
      //保存iid
      this.iid = this.$route.params.iid
      //根据iid请求商品详情数据
      getDetail(this.iid).then(res=>{
        const data = res.result
        //获取顶部图片轮播数据
        this.topImages = data.itemInfo.topImages
        console.log(res);
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
    },
    updated() {
      this.$refs.scroll.refresh()
    }
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

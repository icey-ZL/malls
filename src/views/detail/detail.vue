<template>
    <div class="detail">
      <detail-nav-bar></detail-nav-bar>
      <detail-swiper :topImages="topImages"></detail-swiper>

    </div>
</template>

<script>
  import detailNavBar from './childrenComponent/detailNavBar'
  import detailSwiper from './childrenComponent/detailSwiper'

  import {getDetail} from "../../network/detail";

  export default {
      name: "detail",
      data(){
        return{
          iid:null,
          topImages:[]

        }
      },
      components:{
        detailNavBar,
        detailSwiper
      },
      created() {
        //保存iid
        this.iid = this.$route.params.iid
        //根据iid请求商品详情数据
        getDetail(this.iid).then(res=>{
          //获取顶部图片轮播数据
          this.topImages = res.result.itemInfo.topImages
          console.log(res);
        })
      }
    }
</script>

<style scoped>
  .detail{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

</style>

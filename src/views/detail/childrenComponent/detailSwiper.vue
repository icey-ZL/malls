<template>

      <swiper class="detail-swiper">
        <swiper-item v-for="(item,index) in topImages" :key="index">
          <img :src="item" alt="">
        </swiper-item>
      </swiper>

</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper/index'
    export default {
      name: "detailSwiper",
      props:{
        topImages: {
          type:Array,
          default(){
            return []
          }
        }
      },
      components:{
        Swiper,
        SwiperItem,
      }
    }
</script>

<style scoped>
  .detail-swiper{
    height: 45vh;
    overflow: hidden;
  }
  .detail-swiper img{

  }
</style>

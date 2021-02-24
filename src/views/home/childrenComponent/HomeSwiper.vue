<template>
  <swiper>
    <swiper-item v-for="(item,index) in banner" :key="index" >
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgload">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper/index'
    export default {
      name: "HomeSwiper",
      props:{
        banner:{
          type:Array,
          default() {
            return [];
          }
        }
      },
      data(){
        return{

        }
      },
      components:{
        Swiper,
        SwiperItem
      },
      methods:{
        imgload(){
          this.$emit('swiperImgLoad')
        }
      }
    }
</script>
<style scoped>

</style>

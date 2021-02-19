<template>
  <div class="home">
    <nav-bar>
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>

    <h2>首页</h2>
  </div>


</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import { getHomeMultidata } from 'network/home';
  import HomeSwiper from './childrenCompnent/HomeSwiper'
  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
    },
    data(){
      return{
        banner:[],
        recommend:[]
      }
    },
    created(){
      //请求多个数据
      getHomeMultidata()
      .then(res=>{
        //保存结果
        //created的外层作用域是组件实例
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
        }).catch(err=>err)
    }
  }
</script>

<style scoped>
  .home-nav{
    color: var(--color-background);
    background: var(--color-tint);
  }
</style>

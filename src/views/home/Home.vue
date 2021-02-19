<template>
  <div class="home">
    <nav-bar>
      <div slot="center">购物街</div>
      <div slot="center">购物街</div>
      <div slot="center">购物街</div>
    </nav-bar>
    <h2>首页</h2>
  </div>


</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import { getHomeMultidata } from "network/home";

  export default {
    name: "Home",
    components:{
        NavBar
    },
    created(){
      //请求多个数据
      getHomeMultidata()
      .then(res=>{
          console.log(res);
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

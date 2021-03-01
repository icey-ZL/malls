<template>
  <div id="cart">
    <nav-bar class="cart-bar">
      <div slot="center">购物车({{len}})</div>
    </nav-bar>
    <div class="goodsList">
      <ul v-if="$store.state.cartList.length !== 0" >
        <li v-for="item in $store.state.cartList">{{item}}</li>
      </ul>
      <div v-else>购物车是空的，快去添加自己喜欢的商品吧～</div>
    </div>

  </div>


</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import { mapGetters } from 'vuex'
    export default {
      name: "Cart",
      components:{
        NavBar,
      },
      computed:{
        //第一种语法,传入数组
        //...mapGetters(['cartLen'])
        //第二种语法。传入对象
        ...mapGetters({
          len:'cartLen'
        })
      }
    }
</script>

<style scoped>
  #cart{
    padding-top: 44px;
  }
  .cart-bar{
    color: var(--color-background);
    background: var(--color-tint);
  }
  .goos-list{
    width: 100vw;
    height: 100vh;
  }
</style>

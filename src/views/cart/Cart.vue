<template>
  <div id="cart">
    <nav-bar class="cart-bar">
      <div slot="center">购物车({{len}})</div>
    </nav-bar>

    <div class="cart-list">
        <cart-list></cart-list>
    </div>
  </div>


</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from "./childrenComponent/cartList";
  import { mapGetters } from 'vuex'

    export default {
      name: "Cart",

      components:{
        CartList,
        NavBar,
      },
      computed:{
        //第一种语法,传入数组
        //...mapGetters(['cartLen'])
        //第二种语法。传入对象
        ...mapGetters({
          len:'cartLen'
        })
      },

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
  .cart-list{
    background: #f6f6f6;
  }
</style>

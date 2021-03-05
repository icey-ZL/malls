<template>
  <div id="cart">
    <nav-bar class="cart-bar">
      <div slot="center">购物车({{len}})</div>
    </nav-bar>

    <div class="cart-list">
        <cart-list v-if="$store.state.cartList.length !== 0"></cart-list>
        <div v-if="$store.state.cartList.length === 0">购物车是空的，快去添加自己喜欢的商品吧～</div>
    </div>

    <cart-bottom-bar v-if="$store.state.cartList.length !== 0"></cart-bottom-bar>

  </div>


</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from "./childrenComponent/cartList";
  import { mapGetters } from 'vuex'
  import CartBottomBar from "./childrenComponent/cartBottomBar";

    export default {
      name: "Cart",
      props:{
        allChecked:{
          type:Boolean,
          default(){
            return true
          }
        }
      },
      components:{
        CartBottomBar,
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

</style>

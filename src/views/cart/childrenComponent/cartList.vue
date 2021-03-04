<template>
    <div class="cartList">
      <scroll class="content" ref="scroll" >
        <div v-if="$store.state.cartList.length !== 0">
          <cart-list-item v-for="(item,index) in cartList" :product="item"></cart-list-item>
        </div>
        <div v-else>购物车是空的，快去添加自己喜欢的商品吧～</div>
      </scroll>

    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import scroll from "components/common/scroll/scroll";
  import CartListItem from "./cartListItem";
  export default {
    name: "cartList",
    watch:{
      cartList(){
       // this.$refs.scroll.refresh()
       // console.log(123)
      }
    },
    components: {
      CartListItem,
      scroll
    },
    computed:{
      ...mapGetters(['cartList'])
    },
    updated(){
      this.$refs.scroll.refresh()
    },
    activated() {

      console.log(457);
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .content{
    height: calc(100vh - 93px) ;
    overflow: hidden;

  }
</style>

<template>
    <div class="cartList">
      <scroll class="content" ref="scroll" >
          <cart-list-item v-for="(item,index) in cartList" :product="item" :key="index"></cart-list-item>
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
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .content{
    height: calc(100vh - 93px - 40px) ;
    overflow: hidden;
    background: #f6f6f6;

  }
</style>

<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'
    export default {
      name: "GoodsList",
      components:{
        GoodsListItem,
      },
      props:{
        goods:{
          type:Array,
          default(){
            return []
          }
        }
      }
    }
</script>

<style scoped>
  .goods{
    /*display: flex;*/
    /*flex-direction: row;*/
    /*flex-wrap: wrap;*/
    /*justify-content: center;*/

    /*瀑布流布局*/
    column-count: 2;
    column-gap: 10px;
    margin: 0 10px;



    text-align: center;

    /*overflow: hidden;*/
    /*margin-bottom: 49px;*/
  }
</style>

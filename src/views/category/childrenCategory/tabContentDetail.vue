<template>
  <!--<GridView>-->
  <div class="content-detail" v-if="categoryDetail">
    <goods-list-item v-for="(item, index) in categoryDetail" :key="index" :goods-item="item"></goods-list-item>
  </div>
  <!--</GridView>-->
</template>

<script>
    import GoodsListItem from "../../../components/content/goods/GoodsListItem";
    import GridView from "../../../components/common/gridView/GridView";
    export default {
      name: "tabContentDetail",
      components: {GridView, GoodsListItem},
      props:{
        categoryDetail: {
          type: Array,
          default() {
            return []
          }
        }
      }
    }
</script>

<style scoped>
  .content-detail{
    display: flex;
    /*flex-flow: column wrap;*/

    flex-direction: row;
    flex-wrap: wrap;
  }
</style>

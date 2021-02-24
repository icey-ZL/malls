<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.show.img" alt="" @load="imgload">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">
        {{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  import {debounce} from '../../../common/utils'
    export default {
      name: "GoodsListItem",
      props:{
        goodsItem:{
          type:Object,
          default() {
            return {};
          }
        }
      },
      methods:{
        imgload(){
          this.$bus.$emit('onload')
         // console.log(this.$store.state.imgload);
        },
        itemClick(){
          this.$router.push('/detail/'+ this.goodsItem.iid)
        }
      },
      mounted() {
        this.$store.commit('onload')
        let aaa = debounce(this.$store.commit('onload'),5)
        aaa
      }
    }
</script>

<style scoped>
  .goods-item{
    width: 49%;
    padding-left: 2%;
    /*width: calc(100vw/2 - 20px);*/

    /*break-inside: avoid;*/

    /*否则内容会被截断*/
    /*height: 100%;*/
    /*overflow: auto;*/
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info{
    height:40px;
    margin-top:3px;
    font-size: 14px;
  }
  .goods-info p{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .goods-info .price{
    padding:0 10px;
    color: var(--color-high-text);
  }
  .goods-info .collect{
    position: relative;
    margin: 0 10px;
    z-index: -1;
    /*color: var(--color-high-text);*/
  }
  .goods-info .collect:before{
    content: '';
    position: absolute;
    width: 14px;
    height :14px;
    top: 1px;
    left: -10px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>

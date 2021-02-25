<template>
    <div class="base-info" v-if="Object.keys(goods).length !== 0">
      <div class="info-title">{{goods.title}}</div>
      <div class="info-price">
        <span class="n-price">{{goods.newPrice}}</span>
        <span class="o-price">{{goods.oldPrice}}</span>
        <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
      </div>
      <div class="other-info">
        <span>{{goods.columns[0]}}</span>
        <span>{{goods.columns[1]}}</span>
        <span>{{goods.services[goods.services.length-1].name}}</span>
      </div>
      <div class="info-service">
        <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
          <img :src="goods.services[index-1].icon" alt="" v-if="goods.services[index-1].icon"/>
          <span>{{goods.services[index-1].name}}</span>
        </span>
      </div>
    </div>
</template>

<script>
    export default {
      name: "detailBaseInfo",

      props:{
        goods:{
          type:Object,
          default(){
            return {}
          }
        }
      }
    }
</script>

<style scoped>
  .base-info{
    margin-top: 10px;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-title{
    font-size: 16px;
    color: #2c2c2c;
    padding: 5px 10px;
  }
  .info-price{
    margin: 5px 10px;
    line-height: 30px;

  }
  .o-price{
    font-size: 14px;
    text-decoration: line-through;
    margin: 0 4px 0 10px;
  }
  .n-price{
    font-size: 20px;
    color: var(--color-high-text);
  }
  .discount{
    position: relative;
    bottom: 6px;
    font-size: 14px;
    background: var(--color-high-text);
    color: #fcfcfc;
    border-radius: 10px;
    padding: 1px 5px;

  }
  .other-info{
    margin: 0 10px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
  }
  .info-service{
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    margin: 0 10px;
  }
  .info-service-item{
    font-size: 13px;
    color: #333;
  }
  .info-service-item img{
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }
</style>

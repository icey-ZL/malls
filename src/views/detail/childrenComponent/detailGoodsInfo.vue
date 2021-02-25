<template>
  <div class="detail-info">
    <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
      <div class="info-desc ">
        <div class="desc">
          <div class="info">{{detailInfo.desc}}</div>
        </div>
      </div>
      <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
      <div class="info-list">
        <img v-for="(item, index) in detailInfo.detailImage[0].list" :src="item" alt="" @load="imgload">
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "detailGoodsInfo",
      props:{
        detailInfo:{
          type:Object,
          default(){
            return {}
          }
        }
      },
      data(){
        return{
          count:0,
          imgLen:0
        }
      },
      methods:{
        imgload(){
          //只发送最后一次
          if(++this.count === this.imgLen){
            this.$emit('infoImgLoad')
          }

        }
      },
      watch:{
        detailInfo(){
          this.imgLen = this.detailInfo.detailImage[0].list.length
        }
      }

    }
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-desc {
    padding: 0 15px;
  }

  .info-desc::before,.info-desc::after{
    content: '';
    position: relative;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }
  .info-desc::before{
    float: left;
  }
  .info-desc::after{
    float: right;
    bottom: 4px;
  }
  .desc::before,.desc::after{
    content: '';
    position: relative;
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;

  }
  .desc::before{
    float: left;
    bottom: 15px;
  }
  .desc::after{
    float: right;
    top: 15px;
  }
  .info{
    display: inline-flex;
    width: 100%;
  }
  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }
  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }
  .info-list img {
    width: 100%;
  }
</style>

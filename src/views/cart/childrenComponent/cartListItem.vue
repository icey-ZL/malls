<template>
  <div class="list-item">
    <div class="shop-item">
      <div class="shop-selector">
        <check-button :is-active="product.checked" @click.native="shopClick"></check-button>
      </div>
      <i class="icon-shop"></i>
      {{product.shop}} >
    </div>
    <div class="goods-item" v-for="(item,index) in product.goods">
      <div class="item-selector">
        <check-button :is-active="product.goods[index].checked" @click.native="itemClick(index)"></check-button>
      </div>
      <div class="goods-img item-left">
        <img :src="item.img" alt="">
      </div>
      <div class="item-right">
        <div class="goods-title">{{item.title}}</div>
        <div class="goods-desc">{{item.desc}}</div>
        <div class="goods-choice">
          <div class="goods-price">¥{{item.price}}</div>
          <div class="goods-count">x{{item.count}}</div>
        </div>
      </div>
      </div>


  </div>
</template>

<script>
    import CheckButton from "components/content/checkButton/checkButton";
    export default {
      name: "cartListItem",
      components: {
        CheckButton
      },
      props:{
        product:{
          type:Object,
          default(){
            return{}
          }
        }
      },
      methods:{
        shopClick(){
          this.product.checked = !this.product.checked
          //判断是否全选
          if(this.product.checked){
            this.product.goods.map(x=>{x.checked = true})
          }else {
            this.product.goods.map(x=>{x.checked = false})
          }
        },
        itemClick(index){
          this.product.goods[index].checked = !this.product.goods[index].checked
          //如果有不选中时店铺不能选中状态
          if(this.product.goods[index].checked === false){
            this.product.checked = false
          }
          //如果当前店铺下全部选中则选中店铺
          if(this.product.goods.filter(x=>{return x.checked === false}).length === 0){
            this.product.checked = true
          }
        }
      }
    }
</script>

<style scoped>
  .list-item{
    background: #fff;
    border-radius: 10px;
    margin: 5px;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
  }
  .item-selector {
    position: relative;
    /*top: 30px;*/
    height: 18px;
    width: 18px;
    display: flex;
    margin: auto 0;
  }
  .shop-selector{
    height: 18px;
    width: 18px;
    display: flex;
    margin: auto 0 ;
  }
  .shop-item{
    display: flex;
    font-size: 14px;
    font-weight: 700;
    line-height: 35px;

  }
  .shop-item .icon-shop{
    display: block;
    height: 20px;
    width: 20px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
    background-position: 0 -90px;
    margin: auto 6px;
  }
  .goods-item{
    margin: 0 5px 10px 5px;
    display: flex;
    overflow: hidden;

  }

  .goods-img img{
    width: 80px;
    height: 80px;
  }
  .item-left {
    margin-left: 5px;
  }
  .item-right{
    overflow: hidden;
    margin: 0 10px;
  }
  .goods-desc,.goods-title{
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 10px;
    font-weight: 500;
    font-size: 14px;
  }
  .item-right .goods-desc{
    font-size: 12px;
  }
  .goods-choice{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 25px;
  }
  .goods-price{
    color:var(--color-tint) ;
  }

</style>

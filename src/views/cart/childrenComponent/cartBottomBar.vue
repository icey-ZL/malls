<template>
    <div class="bottom-bar">
      <div class="bar-left">
        <div class="all-selector">
          <check-button @click.native="allClick"  :is-active="allChecked"></check-button>
        </div>
        全选
      </div>
      <div class="bar-right">
        <div class="total">
          合计：{{total.price}}
        </div>
        <div class="buy">购买{{total.gc}}</div>
      </div>
    </div>
</template>

<script>
    import CheckButton from "../../../components/content/checkButton/checkButton";
    import {mapGetters} from 'vuex'
    export default {
      name: "cartBottomBar",
      components: {CheckButton},
      methods:{
        allClick(){
          if(this.allChecked){ // 全部选中
            this.cartList.forEach(x=>{
              x.goods.forEach(x=>x.checked = false)
              return x.checked = false
            })
          }else {
            this.cartList.forEach(x=>{
              x.goods.forEach(x=>x.checked = true)
              return x.checked = true
            })
          }

        },

      },
      computed:{
        ...mapGetters(['cartList']),
        total(){
          let checkedGoods=[]
          //筛选出每个店铺选中的商品数据，并去除空数组
          checkedGoods=this.cartList.map(x => {
            return x.goods.filter(y => {
              return y.checked === true
           })
          }).filter(x=>{ return x.length !== 0})
          //计算总价格
          let totalPrice=0
          let count = 0
          for(let item of checkedGoods){
            if(item.length){
              for(let i in item){
                count = count+1
                totalPrice += item[i].count * item[i].price
              }
            }
          }
          let price ='¥'+totalPrice.toFixed(2)
          let gc = '('+count+')'
          return {gc, price}
        },
        allChecked(){
          return this.cartList.every((item,index,array)=>{return item.checked })
        }
      }
    }
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*background: #fff;*/
  }
  .bar-left{
    display: flex;
    position: relative;
    left: 15px;
  }
  .bar-right{
    display: flex;
    position: relative;
    right: 15px;
    align-items: center;
  }
  .all-selector{
    height: 18px;
    width: 18px;
    margin-right: 5px;
  }
  .buy{
    background: var(--color-tint);
    color: white;
    line-height: 35px;
    border-radius: 20px;
    padding: 0 20px;
    margin-left: 10px;
  }
</style>

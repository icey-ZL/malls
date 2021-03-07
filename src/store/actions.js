import {
  ADD_COUNTER,
  ADD_TO_CART,
  ADD_TO_GOOD
} from './mutation-types'
//action除了放异步操作还可以放调用mutation方法的方法，mutation是单一方法，最好不要放多种方法，最好通过action调用mutatiom
export default  {
  addCart(context,payload){
     return new Promise((resolve,reject)=>{
       //查找是否有该店铺
       let oldshop = context.state.cartList.find(item =>{return item.shop === payload.shop })
       //有则判断有没有同一个商品
       if(oldshop){
         //查找是否有该商品
         let oldCart = oldshop.goods.find(item =>{return item.iid === payload.goods[0].iid })
         //判断若有则count+1
         if (oldCart){
           //浅拷贝，复制的是引用地址，oldCart变了cartList也变了 oldCart.count += 1
           context.commit(ADD_COUNTER,oldCart)
           resolve('商品数量+1')
         }else {
           payload.goods[0].count = 1
           context.commit(ADD_TO_GOOD,payload)
           resolve('添加了新的商品')
         }
       }else {
         payload.goods[0].count = 1
         context.commit(ADD_TO_CART,payload)
         resolve('添加了新的商品')
       }
     })






  },
}

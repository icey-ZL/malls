import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'
//action除了放异步操作还可以放调用mutation方法的方法，mutation是单一方法，最好不要放多种方法，最好通过action调用mutatiom
export default  {
  addCart(context,payload){
    //state.cartList.push(payload)

    //查找是否有该商品
    let oldCart = context.state.cartList.find(item =>{return item.iid === payload.iid })
    //判断若有则count+1
    if (oldCart){
      //浅拷贝，复制的是引用地址，oldCart变了cartList也变了 oldCart.count += 1
      context.commit(ADD_COUNTER,oldCart)
    }else {
      payload.count = 1
      context.commit(ADD_TO_CART,payload)
      // context.state.cartList.push(payload)
    }
  },
}

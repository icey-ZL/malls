export default {
  cartLen(state){
    let c=0
    if(state.cartList){
    for (let i in state.cartList){
      c += state.cartList[i].goods.length
    }
    }
    return c
   // return state.cartList.length
  },
  cartList(state){
    return state.cartList
  }
}

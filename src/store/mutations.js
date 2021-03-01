import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'
export default{
  //motations中的方法完成的操作尽量单一

  [ADD_COUNTER](state,payload){
    payload.count +=1
  },
  [ADD_TO_CART](state,payload){
    state.cartList.push(payload)
  }
}

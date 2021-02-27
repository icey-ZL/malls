import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    imgload:{
      type:Boolean,
      default: false
    }
  },
  mutations: {
    onload(state){
      state.imgload = true
     // console.log(1111);
    },
    loaded(state){
      state.imgload = false
     // console.log(3333);
    }
  },
  actions: {
  },
  modules: {
  }
})

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './components/common/toast'
import fastClick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'
//安装toast插件
Vue.use(toast)
//使用图片懒加载
Vue.use(vueLazyLoad,{
  //加载前填充
  loading:require('./assets/img/common/placeholder.png')
})
//解决移动端300ms延迟
fastClick.attach(document.body)
//vue实例作为事件总线
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

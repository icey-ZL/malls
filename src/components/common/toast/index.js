import Toast from './toast'
const obj ={

}
obj.install = function (Vue) {
  //install默认传过来了Vue
  //挂载vue文件中的template
  // 1创建组件构造器
  const toastContruster = Vue.extend(Toast)
  // 2使用new通过组件构造器，创建组件对象
  const toast = new toastContruster()
  // 3挂载组件对象到某一元素上
  toast.$mount(document.createElement('div'))
  // 4toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  //组件对象
  Vue.prototype.$toast = toast
}
export default obj

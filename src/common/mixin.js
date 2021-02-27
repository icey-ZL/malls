
export const backTopMixin = {
  data: function () {
    return {
       showBackTop: false
    }
  },
  methods: {
    backTop: function () {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }
}

import loadsh from 'loadsh'
import scroll from 'components/common/scroll/scroll'
import {debounce} from './utils1'
export const itemListenerMinxin ={

  data(){
    return{
      imgListener:null,
      refresh:{}

    }
  },
  mounted(){
    //图片加载完成的事件监听
    //在methods之中 如果使用let赋值，会被频繁调用，防抖不起效果
   // let refresh = _.debounce(()=>{ this.$refs.scroll.refresh()},500)
   // this.refresh =_.debounce(()=>{console.log('12233')},500)
    let refresh =debounce(()=>{this.$refs.scroll.refresh()},500)
    this.imgListener = function(){
      //不能直接用，直接用无效
      refresh()
      //console.log(8888);
      // this.$refs.scroll.refresh()
    }
    // this.$bus.$on('onload',this.imgListener)
    //挂载时图片不一定加载完了，所以获取的高度不一定准确
  },
}

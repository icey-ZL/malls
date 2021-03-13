<template>
    <div ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'



    export default {
      name: "scroll",
      data(){
        return{
          scroll:null
        }
      },
      props:{
        probeType:{
          type: Number,
          default: 0
        },
        pullUp:{
          type: Boolean,
          default: false
        },
        pullDown:{
          type: Boolean,
          default: false
        },
        data: {
          type: Array,
          default: () => {
            return []
          }
        },
      },
      mounted() {
        setTimeout(this.initScroll, 20)
        //创建bscroll对象
        // this.scroll = new BScroll('.wrapper',{
        //   click : true,  //对button不起作用，但是别的标签需要加
        //   probeType : this.probeType,
        //   pullUpLoad : this.pullUp,
        //   pullDownRefresh : {
        //     threshold: 30,
        //     //stop:20
        //   }
        // })
        // //监听滚动位置
        // if( this.probeType===2||this.probeType===3){  //增加性能
        //   this.scroll.on('scroll',position=>{
        //     // console.log(position);
        //     this.$emit('scroll',position)
        //   })
        // }
        // //监听上拉事件
        // if(this.pullUp){
        //   this.scroll.on('pullingUp',()=>{
        //     this.$emit('pullingUp')
        //     this.scroll.finishPullUp();
        //   })
        // }
        // //监听下拉事件
        //   this.scroll.on('pullingDown',()=>{
        //     this.$emit('pullingDown')
        //     this.scroll.finishPullDown();
        //   })

      },
      methods:{
        initScroll(){
          if (!this.$refs.wrapper) return
          this.scroll = new BScroll(this.$refs.wrapper, {
            click : true,  //对button不起作用，但是别的标签需要加
            probeType : this.probeType,
            pullUpLoad : this.pullUp,
            pullDownRefresh : {
              threshold: 30,
              //stop:20
            }
          })
          //监听滚动位置
          if( this.probeType===2||this.probeType===3){  //增加性能
            this.scroll.on('scroll',position=>{
              // console.log(position);
              this.$emit('scroll',position)
            })
          }
          //监听上拉事件
          if(this.pullUp){
            this.scroll.on('pullingUp',()=>{
              this.$emit('pullingUp')
              this.scroll.finishPullUp();
            })
          }
          //监听下拉事件
          this.scroll.on('pullingDown',()=>{
            this.$emit('pullingDown')
            this.scroll.finishPullDown();
          })
        },
        scrollTo(x,y,time=300){
          this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
        },
        refresh(){
          this.scroll && this.scroll.refresh()
          //console.log(123123);
        }
      },
      watch: {
        data() {
          setTimeout(this.refresh, 20)
        }
      }


    }
</script>

<style scoped>

</style>

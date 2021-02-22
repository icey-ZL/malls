<template>
    <div class="wrapper">
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
          type:Number,
          default:0
        }
      },
      mounted() {
        //创建bscroll对象
        this.scroll = new BScroll('.wrapper',{
          click : true,  //对button不起作用，但是别的标签需要加
          probeType : this.probeType,
        })
        //监听滚动位置
        this.scroll.on('scroll',position=>{
          // console.log(position);
          this.$emit('scroll',position)
        })

      },
      methods:{
        scrollTo(x,y,time=300){
          this.scroll.scrollTo(x,y,time)
        }
      }
    }
</script>

<style scoped>

</style>

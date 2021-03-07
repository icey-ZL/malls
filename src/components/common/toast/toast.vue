<template>
    <div class="toast" v-show="isToastShow">
      {{toastMessege}}
    </div>
</template>

<script>
    export default {
      name: "toast",
      data(){
        return{
          toastMessege:'',
          isToastShow:false
        }
      },
      methods:{
        show(toastMessege='默认文字',duration=2000){
          // duration = duration||2000  //默认值设置，同上
          this.isToastShow = true
          this.toastMessege = toastMessege

          setTimeout(()=>{
            this.isToastShow = false
            this.toastMessege = ''
          },duration)
        }
      }
    }
</script>

<style scoped>
  .toast{
    position: fixed;
    /*居中*/
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

    padding: 8px 10px;
    color: #fcfcfc;
    background: rgba(0,0,0,.75);

    z-index: 999;
  }
</style>

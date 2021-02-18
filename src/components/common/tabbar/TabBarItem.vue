<template>

    <div class="tab-bar-item" @click="itemClick()">
      <div v-if="!isActive">
      <slot  name="item-icon"></slot>
      </div>
      <div v-else><slot name="item-icon-active"></slot>
      </div>
      <div :style="activeStyle">
      <slot name="item-text"></slot>
      </div>
    </div>
</template>

<script>
    export default {
      name: "TabBarItem",
      props:{
        link:String,
        activeColor:{
          type:String,
          default:'#d4237a'
        }
      },
      data(){
        return{

        }
      },
      computed:{
        isActive(){
          return  this.$route.path.indexOf(this.link) !== -1;
          //活跃时下标为0，不活跃时下标为-1
        },
        activeStyle(){
          return this.isActive ? {color:this.activeColor}:{}
        }
      },
      methods:{
          itemClick(){
            //this.isActive=true
            this.$router.replace(this.link).catch(e=>e)
          //  console.log(this.$route.path.indexOf(this.link) + this.$route.path);
          }
      },

    }
</script>

<style scoped>
  .tab-bar-item{
    height: 49px;

    /*平铺*/
    flex: 1;
    /*居中*/
    text-align: center;

    font-size: 14px;

  }
  .tab-bar-item img{
    height: 20px;
    width: 20px;

    /*调整图片离顶部的距离*/
    padding-top: 3px;

    /*调小图片间隙*/
    vertical-align: middle;

  }

</style>

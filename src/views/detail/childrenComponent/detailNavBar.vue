<template>
  <div class="detail-nav-bar">
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div class="title-item"
           v-for="(item,index) in title"
           :class="{active:currentIndex===index}" @click="itemClick(index)">
        {{item}}
      </div>
    </div>
  </nav-bar>
  </div>
</template>

<script>
  import navBar from 'components/common/navbar/NavBar'
    export default {
      name: "detailNavBar",
      components:{
        navBar
      },
      data(){
        return{
          title:['商品','参数','评论','推荐'],
          currentIndex:0,
        }
      },
      methods:{
        itemClick(index){
          this.currentIndex = index
          this.$emit('titleClick',index)
        },
        backClick(){
          this.$router.back()
          // this.$router.go(-1)
        }
      }
    }
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 14px;
  }
  .detail-nav-bar{
    z-index: 10;
    position: relative;
  }
  .title-item{
    flex: 1;
    height: 40px;
  }
  .active{
    color: var(--color-high-text);
    border-bottom: 2px solid var(--color-high-text);

  }
  .back img{
    margin-top: 10px;
  }
</style>

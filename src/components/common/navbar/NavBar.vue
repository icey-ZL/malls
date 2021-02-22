<template>
    <div class="nav-bar home-nav">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>



    </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
  .nav-bar{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;

    display: flex;
    /*line-height可以直接使文字居中*/
    line-height: 44px;
    text-align: center;
    height:44px;
    /*box-shadow:水平方向，垂直方向，模糊度，阴影距离，颜色*/
    box-shadow: 0 1px 1px  rgba(100,100,100,.1);
}
  .left, .right{
    width: 60px;
    /*background: red;*/
  }
  .center{
    flex: 1;
    /*background: blue;*/
  }
</style>

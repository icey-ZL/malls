<template>
  <div class="back-top" @click="topClick">
    <slot><img src="~assets/img/common/top.png" alt=""></slot>
  </div>
</template>

<script>
    export default {
      name: "backTop",
      methods: {
        topClick: function () {
          this.$emit('backTop');
        }
      }
    }
</script>

<style scoped>
  .back-top{
    position: fixed;
    right: 10px;
    bottom: 49px;
  }
  img{
    height: 40px;
    width: 40px;
  }
</style>

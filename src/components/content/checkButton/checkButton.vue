<template>
    <div class="check-button" :class="{checked:isActive}">
      <img src="~assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
    export default {
      name: "checkButton",
      props:{
        isActive:{
          type:Boolean,
          default:false
        }
      }
    }
</script>

<style scoped>
  .check-button{
    background: #ffffff;
    border-radius: 50%;
    border:1px solid #aaa;
    display: flex;
  }
  .checked{
    background: var(--color-tint);
    border-color:  var(--color-tint);
  }
</style>

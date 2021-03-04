<template>
    <div class="check-button">
      <img src="~assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
    export default {
      name: "checkButton"
    }
</script>

<style scoped>
  .check-button{
    background: var(--color-tint);
    border-radius: 50%;
    border:2px solid #f3f3f3;
    width: 20px;
    height: 20px;
    text-align: center;
    justify-content: center;
    display: flex;
  }
</style>

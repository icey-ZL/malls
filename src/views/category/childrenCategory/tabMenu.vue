<template>
  <scroll id="tab-menu" ref="scroll">
    <div class="menu-list">
      <div class="menu-list-item"
           :class="{active: index===currentIndex}"
           v-for="(item, index) in categories"
           :key="index"
           @click="itemClick(index)">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
  import scroll from 'components/common/scroll/scroll'
    export default {
      name: "tabMenu",
      components:{
        scroll
      },
      props: {
        categories: Array
      },
      data() {
        return {
          currentIndex: 0
        }
      },
      methods: {
        itemClick(index) {
          this.currentIndex = index
         // console.log(index);
          this.$emit('selectItem', index)
        }
      },
      updated() {
        this.$refs.scroll.refresh()
      }
    }
</script>

<style scoped>
  #tab-menu {
    background-color: #f6f6f6;
    height: calc(100vh - 44px - 49px);
    width: 80px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }
  .menu-list-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>

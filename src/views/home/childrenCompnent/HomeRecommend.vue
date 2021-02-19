<template>
    <div class="recommend">
      <div class="recommend-item" v-for="item in recommend">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
        </a>
      </div>
    </div>
</template>

<script>
    export default {
      name: "HomeRecommend",
      props:{
        recommend:{
          type:Array,
          default(){
            return []
          }
        }
      }
    }
</script>

<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    border-bottom: 8px solid #eee;
    padding: 5px;
  }
  .recommend-item{
    flex: 1;

  }
  .recommend-item img{
    width: 5rem;
    height: 5rem;
    margin-bottom: 5px;
  }


</style>

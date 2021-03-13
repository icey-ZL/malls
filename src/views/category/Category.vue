<template>
  <div id="category">
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu class="menu" :categories="categories"
                @selectItem="selectItem">

      </tab-menu>
      <!--<div class="tab-left">-->
        <scroll  id="tab-content"
                 ref="scroll"
                 :probe-type="3"
                 @scroll="tabContentScroll"
                 :data="[categoryData]">
          <!--<div class="flex">-->
            <tab-content-category :subcategories="showSubcategory"></tab-content-category>
            <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick"></tab-control>
            <tab-content-detail :category-detail="showCategoryDetail" ></tab-content-detail>
          <!--</div>-->
        </scroll>
      <!--</div>-->
      <back-top @backTop="backTop" v-show="showBackTop"></back-top>
    </div>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import {
    getCategory,
    getSubcategory,
    getCategoryDetail
  } from '@/network/category';
  import tabMenu from "./childrenCategory/tabMenu";
  import scroll from "../../components/common/scroll/scroll";
  import TabControl from "../../components/content/TabControl/TabControl";

  import {tabControlMixin,backTopMixin } from '@/common/mixin'
  import TabContentCategory from "./childrenCategory/tabContentCategory";
  import TabContentDetail from "./childrenCategory/tabContentDetail";
  import GoodsList from "../../components/content/goods/GoodsList";
 // import BackTop from "../../components/content/backTop/backTop";
    export default {
      name: "Category",
      components: {GoodsList, TabContentDetail, TabContentCategory, TabControl, scroll, tabMenu, NavBar},
      mixins:[tabControlMixin,backTopMixin],
      data(){
        return {
          categories: [],
          categoryData: {
          },
          currentIndex: -1
        }
      },
      updated() {
       this.$refs.scroll.refresh()

      },
      created(){
        this.getCategory()
      },
      computed: {
        showSubcategory() {
          if (this.currentIndex === -1) return {}
         // console.log(this.categoryData[this.currentIndex].subcategories);
          return this.categoryData[this.currentIndex].subcategories
        },
        showCategoryDetail() {
          if (this.currentIndex === -1) return []
         // console.log(this.categoryData[this.currentIndex].categoryDetail[this.currentType]);
          return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
        }
      },
      methods:{
        //网络请求相关方法
        getCategory() {
          getCategory().then(res => {
            // 1.获取分类数据
            this.categories = res.data.category.list
            // 2.初始化每个类别的子数据
            for (let i = 0; i < this.categories.length; i++) {
              this.categoryData[i] = {
                subcategories: {},
                categoryDetail: {
                  'pop': [],
                  'new': [],
                  'sell': []
                }
              }
            }
            // 3.请求第一个分类的数据
            this.getSubcategories(0)
          })
        },
        getSubcategories(index) {
          this.currentIndex = index;
          const mailKey = this.categories[index].maitKey;
          getSubcategory(mailKey).then(res => {
            this.categoryData[index].subcategories = res.data
            this.categoryData = {...this.categoryData}
            this.getCategoryDetail('pop')
            this.getCategoryDetail('sell')
            this.getCategoryDetail('new')
          })
        },
        getCategoryDetail(type) {
          // 1.获取请求的miniWallkey
          const miniWallkey = this.categories[this.currentIndex].miniWallkey;
          // 2.发送请求,传入miniWallkey和type
          getCategoryDetail(miniWallkey, type).then(res => {
            // 3.将获取的数据保存下来
            this.categoryData[this.currentIndex].categoryDetail[type] = res
            this.categoryData = {...this.categoryData}
          })
        },

        //事件响应相关的方法

        selectItem(index) {
          //console.log(index);
          this.getSubcategories(index)

        },
        tabContentScroll(position) {
          //控制backtop按钮出现和消失,这里不能抽离混入，除非再起新的方法
          this.showBackTop=  (-position.y) > 1000
        },

      }
    }
</script>

<style scoped>
  #category{

  }
  .category-nav{
    color: var(--color-background);
    background: var(--color-tint);
    z-index: 10;
  }
  .content{
    padding-top: 44px;
    display: flex;
  }
  #tab-content{
/*display: flex;*/
    height: calc(100vh - 93px);
    width: calc(100vw - 80px);
    overflow: hidden;
    /*overflow: hidden;*/

  }
  .menu{
    /*position: fixed;*/
  }
  .tab-left{
    flex: 1;
    /*overflow: hidden;*/
    width: calc(100vw - 80px);
  }
  .flex{
    display: flex;
    flex-direction: column;
  }
</style>

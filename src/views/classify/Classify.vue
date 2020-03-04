<template>
	<div id="classify">
		<nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
		<div class="content">
			<tab-menu :classify="categories" @selectItem="selectItemSet"/>
			<scroll id="tab-content" :data="[categoryData]" ref="scroll">
				<tab-content-classify :tabContent="showTabContent"/>
				<tab-control :titles="['综合','新品','销量']" @tabClick="tabClick"/>
				<!-- <div v-for="item in showCategoryDetail">
					{{item.img}}
				</div> -->
				<tab-content-detail :category-detail="showCategoryDetail"/> 
			</scroll>
		</div>
	</div>
		
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import Scroll from 'components/common/scroll/Scroll'
	import TabControl from 'components/content/tabControl/TabControl'
	import TabMenu from './childComps/TabMenu'
	import TabContentClassify from './childComps/TabContentClassify'
	import TabContentDetail from './childComps/TabContentDetail'
	
	import {tabControlMixin,itemListenerMixin} from 'common/mixin'
	import {getCategory,getSubcategory,getCategoryDetail} from 'network/classify'
	export default {
		name:'Classify',
		data(){
			return {
				categories: [],
				categoryData: {},
				currentIndex: -1
			}
		},
		created(){
			this._getCategory()
			//console.log(this.showCategoryDetail)
		},
		mixins:[tabControlMixin],
		computed:{
			showTabContent(){
				 if (this.currentIndex === -1) return {}
				return this.categoryData[this.currentIndex].subcategories
			},
			showCategoryDetail() {
			  if (this.currentIndex === -1) return []
			  return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
			}
		},
		methods:{
			_getCategory(){
				getCategory().then(res => {
					//console.log(res)
					//分类数据
					this.categories = res.data.category.list
					//初始化每一个分类
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
					//请求第一个分类数据
					this._getSubcategories(0)
				})
			},
			_getSubcategories(index){
				this.currentIndex = index;
				const mailKey = this.categories[index].maitKey;
				getSubcategory(mailKey).then(res => {
					//console.log(res)
				  this.categoryData[index].subcategories = res.data
				  this.categoryData = {...this.categoryData}
				  this._getCategoryDetail('pop')
				  this._getCategoryDetail('sell')
				  this._getCategoryDetail('new')
				})
			},
			_getCategoryDetail(type) {
			  // 获取请求的miniWallkey
			  const miniWallkey = this.categories[this.currentIndex].miniWallkey;
			  // 2.发送请求,传入miniWallkey和type
			  getCategoryDetail(miniWallkey, type).then(res => {
				 // console.log(res)
			    // 3.将获取的数据保存下来
			    this.categoryData[this.currentIndex].categoryDetail[type] = res
			    this.categoryData = {...this.categoryData}
			  })
			},
			/*
			事件响应方法
			*/
		   selectItemSet(index){
			   //console.log('========')
			   this._getSubcategories(index);
			   
		   }
		},
		components:{
			NavBar,
			TabMenu,
			Scroll,
			TabContentClassify,
			TabControl,
			TabContentDetail
		}
	}
</script>


		
	
<style scoped>
	#classify{
		height: 100vh;
	}
	.nav-bar {
	  background-color: var(--color-tint);
	  font-weight: 700;
	  color: #fff;
	 
	}
	.content {
	  position: absolute;
	  left: 0;
	  right: 0;
	  top: 44px;
	  bottom: 49px;
	  display: flex;
	}
	  #tab-content {
	  height: 100%;
	  flex: 1;
	  overflow: hidden;
	}
	.test{
		height: 100px;
		width: 100%;
	}
</style>

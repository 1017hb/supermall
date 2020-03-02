<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
			<tab-control
			 :titles="['流行','新款','精选']" 
			 class="tab-control-top"
			 @tabClick = "tabClick"
			 ref="tabTopControll"
			 v-show="isShowTabControll"/>
			 
			<scroll class="content" 
			ref="scroll" 
			:probe-type="3" 
			@scroll="scrollContext" 
			:pull-up-load = "true"
			@pullingUp="loadMore">
				<home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
				<recommend-view :recommends="recommends" />
				<feature-view/>
				<tab-control
				 :titles="['流行','新款','精选']" 
				 @tabClick = "tabClick"
				 ref="tabControllTop"
				 />
				<goods-list :goods="showGoods"/>
			</scroll>
			<back-top @click.native="backTop" v-show="isShowBackTop"/>
	</div>
</template>

<script>
	
	import NavBar from 'components/common/navbar/NavBar'
	import TabControl from 'components/content/tabControl/TabControl'
	import GoodsList from 'components/content/goods/GoodsList'
	import Scroll from 'components/common/scroll/Scroll'
	
	import HomeSwiper from './childComps/HomeSwiper'
	import RecommendView from './childComps/RecommendView'
	import FeatureView from './childComps/FeatureView'
	
	import {getHomeMultidata,getHomeGoods} from 'network/home'
	
	import {debounce} from 'common/utils'
	import {itemListenerMixin,backTopMixin} from 'common/mixin'
	export default {
		name:'Home',
		data(){
			return {
				banners:[],
				recommends:[],
				goods:{
					'pop':{page:0,list:[]},
					'new':{page:0,list:[]},
					'sell':{page:0,list:[]},
				},
				currentType:'pop',
				tabOffsetTop:0,
				isShowTabControll:false,
				saveY:0,
			}
		},
		mixins:[itemListenerMixin,backTopMixin],
		components:{
			NavBar,
			TabControl,
			HomeSwiper,
			RecommendView,
			FeatureView,
			GoodsList,
			Scroll		
		},
		computed:{
			showGoods(){
				return this.goods[this.currentType].list
			}
		},
		destroyed(){
			//console.log('销毁')
		},
		activated(){
			//console.log('开始活动')
			this.$refs.scroll.scrollTo(0,this.saveY,0)
		},
		deactivated(){
			this.saveY = this.$refs.scroll.getScrollY();
			//取消全局时间的监听
			this.$bus.$off('itemImageLoad',this.itemImgListener)
			//console.log('停止活动')
		},
		methods:{
			/*
			*事件监听
			*/
	
			tabClick(index){
				switch(index){
					case 0:
						this.currentType = 'pop';
						break;
					case 1:
						this.currentType = 'new';
						break;
					case 2:
						this.currentType = 'sell';
						break;	
				}
				
				this.$refs.tabControllTop.currentIndex = index;
				this.$refs.tabTopControll.currentIndex = index;
			},
			scrollContext(position){			
				//backTop
				this.isShowBackTop = (-position.y) > 1000;
				//tabcontroll
				this.isShowTabControll = (-position.y) > this.tabOffsetTop
				
				/*if(position.y<-1000){
					this.isShowBackTop = true
				}else{
					this.isShowBackTop = false
				}*/
			},
			loadMore(){
				this.getHomeGoods(this.currentType)
			},
			swiperImageLoad(){
				//获取tabControl的offsetTop
					//所有的组建又有一个属性$el，用域获取组建中的元素
				//console.log(this.$refs.tabControllTop.$el.offsetTop)
				this.tabOffsetTop = this.$refs.tabControllTop.$el.offsetTop
			},
			/*
			*网络请求
			*/
			getHomeMultidata(){
				getHomeMultidata().then(res => {
					this.banners = res.data.banner.list
					this.recommends = res.data.recommend.list	
				})
			},
			getHomeGoods(type){
				const page = this.goods[type].page + 1;
				getHomeGoods(type,page).then(res => {	
					this.goods[type].list.push(...res.data.list)
					/* for(let obj of res.data.list){
						this.goods[type].list.push(obj)
					} */
					this.goods[type].page += 1;
					this.$refs.scroll.finishPullUp();//完成上拉加载后才能再次进行上拉加载	
				})
			}
		},
		created(){
			this.getHomeMultidata(),
			this.getHomeGoods('pop'),
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		},
		mounted(){
			//先挂载 this.$refs.tabControllTop 才不会undefined
			this.tabClick(0);
		}
	}
</script>

<style scoped>
	#home{
		/* padding-top: 44px; */
		height: 100vh; 
		position: relative; 
	}
	.home-nav{
		background-color: var(--color-tint);
		color: #fff;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9; 
	}
	/* .tab-control{
		position: sticky;
		top: 44px;
		z-index: 9;
	} */
	.tab-control-top{
		/* position: relative; */
		position: fixed;
		top: 44px;
		left: 0;
		right: 0;
		z-index: 9;
		
	}
	/* .flixed{
		position: fixed;
		top: 44px;
		right: 0;
		left: 0;
	} */
	.content{
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
	/* .content{
		height: calc(100% - 93px);
		overflow: hidden;
		margin-top: 44px;
	} */
</style>

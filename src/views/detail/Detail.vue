<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav" @detailTitle="detailTitle" ref="nav"/>
		<scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">	
			<detail-swiper :top-image="topImages"/>
			<detail-base-info :goods="goods"/>
			<detail-shop-info :shop="shop"/>
			<detail-info :detail-info = "detailInfo" @detailImageLoad="detailImageLoad"/>
			<detail-param-info ref="param" :param-info="paramsInfo"/>
			<detail-comment-info ref="comment" :comment-info="commentInfo"/>
			<goods-list ref="recommend" :goods = "recommends"/>
		</scroll>
		
		<detail-bottom-bar @addCart="addToCart"/>
		<back-top @click.native="backTop" v-show="isShowBackTop"/>
		
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwiper'
	import DetailBaseInfo from './childComps/DetailBaseInfo'
	import DetailShopInfo from './childComps/DetailShopInfo'
	import DetailInfo from './childComps/DetailGoodsInfo'
	import DetailParamInfo from './childComps/DetailParamInfo'
	import DetailCommentInfo from './childComps/DetailCommentInfo'
	import DetailBottomBar from './childComps/DetailBottomBar'
	
	import Scroll from 'components/common/scroll/Scroll'
	import GoodsList from 'components/content/goods/GoodsList'
	/* import Toast from 'components/common/toast/Toast' */
		
	import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
	
	import {debounce} from 'common/utils'
	import {itemListenerMixin,backTopMixin} from 'common/mixin'
	
	import {mapActions} from 'vuex'
	export default {
		name:'Detail',
		data(){
			return {
				id:null,
				topImages:[],
				goods:{},
				shop:{},
				detailInfo:{},
				paramsInfo:{},
				commentInfo:{},
				recommends:[],
				themeTopYs:[],
				currentIndex:0,
				//show:false,
				//message:''
			}
		},
		mixins:[itemListenerMixin,backTopMixin],
		created(){
			//console.log(this.$route.params)
			this.id = this.$route.params.iid
			
			getDetail(this.id).then(res => {
				console.log(res)
				const data = res.result;
				this.topImages = data.itemInfo.topImages
				//console.log(this.topImages)
				this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
				//商铺信息
				this.shop = new Shop(data.shopInfo)
				//详情信息
				this.detailInfo = data.detailInfo
				//商品尺寸信息
				this.paramsInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
				//评论
				if(data.rate.cRate !== 0){
					this.commentInfo = data.rate.list[0]
				}
				//console.log(this.commentInfo)
				//数据获取完后，还要dom渲染才可以获取值
				
				//下一侦
				//等到所有的渲染完成再执行
				//等图片完全加载完才行
				/* this.$nextTick(() => {
					this.themeTopYs = []
					this.themeTopYs.push(0),
					this.themeTopYs.push(this.$refs.param.$el.offsetTop)
					this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
					this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
				}) */
			});
			getRecommend().then(res => {
				this.recommends = res.data.list
			})
			//console.log(this.id)
		},
		mounted(){
			//console.log('mounted');
		
		},
		destroyed(){
			this.$bus.$off('itemImageLoad',this.itemImgListener)
		},
		methods:{
			...mapActions(['addCart']),
			addToCart(){
				console.log('gou');
				const product = {}
				product.image = this.topImages[0];
				product.title = this.goods.title;
				product.desc = this.goods.desc;
				product.price = this.goods.realPrice;
				//console.log(this.goods)
				product.id = this.id;
				
				//this.$store.cartList.push(<back-top @click.native="backTop" v-show="isShowBackTop"/>)
				//this.$store.commit('addCart',product) 
				//console.log(product.id)
				/* this.$store.dispatch('addCart',product).then(res => {
					console.log(res)
				}), */
				this.addCart(product).then(res => {
					console.log(res)
					/* this.show = true
					this.message = res
					setTimeout(() => {
						this.show = false
					},1500) */
					this.$toast.show()
					//this.$toast.show(res,1500)
					console.log(this.$toast)
					
				})
			},
			detailImageLoad(){
				this.$refs.scroll.refresh();
				//console.log('detailImageLoad------------')
				this.themeTopYs = []
				this.themeTopYs.push(0),
				this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
				this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
				this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
				this.themeTopYs.push(this.$refs.recommend.$el.offsetTop + 1000)//非常大的值
				//console.log(this.themeTopYs)
			},
			detailTitle(index){
				this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
				console.log('======'+index)
			},
			contentScroll(position){
				/*
				*内容滚动，对应标题
				*/
				const positIonY = -position.y;
				//判断position在主题中值之间
				//positionY  0  ~  >=themTo[1]   index = 0
				//positionY  themTo[1]  ~  themTo[2]   index = 1
				
				/* let length = this.themeTopYs.length;
				for(let i = 0;i < length; i++){
					 if(this.currentIndex !== i && ((i<length -1 && positIonY >= this.themeTopYs[i] && positIonY <this.themeTopYs[i+1]) || (i === length - 1 && positIonY >= this.themeTopYs[i]))){
						this.currentIndex = i;
						this.$refs.nav.currentIndex = this.currentIndex;
						console.log(i)
					} 
				} */
				 
				let lengthMax = this.themeTopYs.length
				for(let i = 0;i < lengthMax-1; i++){
					if(this.currentIndex !== i && (positIonY >= this.themeTopYs[i] && positIonY < this.themeTopYs[i+1])){
						this.currentIndex = i;
						this.$refs.nav.currentIndex = this.currentIndex;
						//console.log(this.currentIndex)
					}
				}
				
				this.isShowBackTop = (-position.y) > 1000;
				//console.log(position)
			}
		},
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailBottomBar,
			DetailInfo,
			DetailParamInfo,
			DetailCommentInfo,
			Scroll,
			GoodsList
			
		}
	}
</script>

<style scoped>
	#detail{
		position: relative;
		background-color: #fff;
		z-index: 9;
		height: 100vh;
	}
	.detail-nav{
		position: relative;
		background-color: #fff;
		z-index: 9; 
	}
	.content{
		height: calc(100% - 44px - 49px);
	}
</style>

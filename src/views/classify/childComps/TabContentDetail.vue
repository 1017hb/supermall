<template>
	 <grid-view>
		<!-- <div v-for="item in categoryDetail">{{item.img}}</div> -->
		<!-- <goods-list-item v-for="(item, index) in categoryDetail" :key="index" :goods="item"></goods-list-item> -->
		<div class="goods-item" @click="toDetail" v-for="goodsItem in categoryDetail">
			<img :src="goodsItem.img" alt="" @load="imageLoad" />
			<div class="goods-info">
			  <p>{{goodsItem.title}}</p>
			  <span class="price">{{goodsItem.price}}</span>
			  <span class="collect">{{goodsItem.cfav}}</span>
			</div>
		</div>
	</grid-view>
</template>

<script>
	import GridView from 'components/common/gridView/GridView'
	
	
	export default {
		name:'TabContentDetail',
		props:{
			 categoryDetail: {
			  type: Array,
			  default() {
			    return []
			  }
			}
		},
		computed:{
			//console.log(this.getCategoryDetail)
		},
		methods:{
			imageLoad(){
				this.$bus.$emit('itemImageLoad')
				
				/* if(this.$route.path.indexOf('/home')){
					this.$bus.$emit('homeItemImageLoad')// $bus事件总线
				}else if(this.$route.path.indexOf('/detail')){
					this.$bus.$emit('detailItemImageLoad')// $bus事件总线	
				} */
				
				//console.log('事件总线')
			},
			toDetail(){
				this.$router.push('/detail/'+this.goodsItem.iid)
			}
		},
		components:{
			GridView,
			
		}
	}
</script>

<style scoped>
	.goods-item {
			padding-bottom: 40px;
			position: relative;
			width: 48%;
		  }
	
	.goods-item img {
	  width: 100%;
	  border-radius: 5px;
	}
	
	.goods-info {
	  font-size: 12px;
	  position: absolute;
	  bottom: 5px;
	  left: 0;
	  right: 0;
	  overflow: hidden;
	  text-align: center;
	}
	
	.goods-info p {
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	  margin-bottom: 3px;
	}
	
	.goods-info .price {
	  color: var(--color-high-text);
	  margin-right: 20px;
	}
	
	.goods-info .collect {
	  position: relative;
	}
	.goods-info .collect::before {
	  content: '';
	  position: absolute;
	  left: -15px;
	  top: -1px;
	  width: 14px;
	  height: 14px;
	  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
	}
</style>

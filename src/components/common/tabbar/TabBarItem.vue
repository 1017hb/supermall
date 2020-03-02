<template>
	<div class="tab-bar-item" @click="itemClick()">
		<div v-if="!isActive"><slot name="item-icon"></slot></div>
		<div v-else><slot name="item-icon-active"></slot></div>
		
		<div :style="itemColorText"><slot name="item-text"></slot></div>
		<!-- <img src="../../assets/img/tabbar/home.png"/>
		<div>首页</div> -->
	</div>
</template>

<script>
	export default {
		name:'TabBarItem',
		props:{
			path:String,
			activeColor:{
				path:String,
				default:'blue'
			}
		},
		data(){
			return {
				//isActive:true
			}
		},
		computed:{
			isActive(){
				return this.$route.path.indexOf(this.path) !== -1
			},
			itemColorText(){
				return this.isActive? {color:this.activeColor}:{}
			}
		},
		methods:{
			itemClick(){
				//console.log(this.$route.path);
				//console.log(this.path)
				if(this.$route.path !== this.path){
					this.$router.replace(this.path)
				}
			}
		}
	}
</script>

<style scoped>
	.tab-bar-item{
		flex: 1;
		text-align: center;
		height:49px ;
		font-size: 14px;
	}
	.tab-bar-item img{
		width: 24px;
		height: 24px;
		margin-top: 3rpx;
		/* 去除img本身的3个元素 */
		vertical-align: middle;
		margin-bottom: 2px;
	}
	
</style>

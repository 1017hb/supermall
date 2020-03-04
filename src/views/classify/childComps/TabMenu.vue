<template>
	<scroll id="tab-menu">
		<div class="menu-item"
			 v-for="(item,index) in classify"
			 :class="{active:currentIndex === index}"
			 @click="clickItem(index)">
			{{item.title}}
		</div>
	</scroll>
</template>

<script>
	import Scroll from 'components/common/scroll/Scroll'
	export default {
		name:'TabMenu',
		props:{
			classify:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data(){
			return{
				currentIndex:0
			}
		},
		methods:{
			clickItem(index){
				this.currentIndex = index
				this.$emit('selectItem',index)
			}
		},
		components:{
			Scroll
		}
	}
</script>

<style scoped>
	 #tab-menu {
	  background-color: #f6f6f6;
	  height: 100%;
	  width: 100px;
	  box-sizing: border-box;
	  overflow: hidden;
	}
	.menu-item{
		height: 45px;
		line-height: 45px;
		text-align: center;
		font-size: 14px;
	}
	.menu-item.active{
		font-weight: 700;
		color: var(--color-high-text);
		background-color: #fff;
		border-left: 3px solid var(--color-high-text);
	}
</style>

<template>
	<div>
		<grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="tabContent.list">
			<div class="item" v-for="item in tabContent.list">
				<a>
					<img class="item-img" :src="item.image" />
					<div class="item-title">{{item.title}}</div>
				</a>
			</div>
		</grid-view>
	</div>
</template>

<script>
	import GridView from 'components/common/gridView/GridView'
	export default {
		name:'TabContentClassify',
		props:{
			tabContent:{
				type:Object,
				default(){
					return {}
				}
			}	
		},
		components:{
			GridView
		}
	}
</script>

<style scoped>
	.item {
	  text-align: center;
	  font-size: 12px;
	}
	
	.item-img {
	  width: 80%;
	}
	
	.item-text {
	  margin-top: 15px;
	}
</style>

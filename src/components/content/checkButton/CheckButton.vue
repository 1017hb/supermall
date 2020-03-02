<template>
	<div class="check-button" 
	:class="{check:isChange}">
		<img src="~assets/img/cart/tick.svg" alt="" />
	</div>
</template>

<script>
	export default {
		name:'CheckButton',
		props:{
			isChange:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style scoped>
	.check-button{
		border-radius: 50%;
		padding: 1px;
		border: 1px solid #aaa;
	}
	.check{
		background-color: red;
		border: 1px solid red;
	}
</style>

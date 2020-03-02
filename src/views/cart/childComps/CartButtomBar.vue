<template>
	<div class="buttom-bar">
		<div class="check-content">
			<check-button 
			:is-change="isSelectAll" 
			class="check-botton"
			@click.native="chickClick"/>
			<span>全选</span>
		</div>
		<div class="price">
			合计：{{totalPrice}}
		</div>
		<div class="catculate" @click="calcClick()">
			去计算({{checkLength}})
		</div>
	</div>
</template>

<script>
	import CheckButton from 'components/content/checkButton/CheckButton'
	import {mapGetters} from 'vuex'
	export default {
		name:'CartButtomBar',
		components:{
			CheckButton
		},
		methods:{
			calcClick(){
				if(!this.isSelectAll){
					this.$toast.show('请先添加商品',1500)
				}
			},
			chickClick(){
				if(this.isSelectAll){
					this.cartList.forEach(item => item.checked = false)
				}else{
					this.cartList.forEach(item => item.checked = true)
				}
			}
		},
		computed:{
			...mapGetters(['cartList']),
			totalPrice(){
				return '￥' + this.cartList.filter(item => {
					return item.checked
				}).reduce((preValue,item) => {
					return preValue + item.price * item.count
				},0).toFixed(2)
			},
			checkLength(){
				return this.cartList.filter(item => item.checked).length
			},
			isSelectAll(){
				//return !(this.cartList.filter(item => !item.checked).length)
				if(this.cartList.length === 0) return false
				return !this.cartList.find(item => !item.checked)
			}
		}
	}
</script>

<style scoped>
	.buttom-bar{
		position: relative;
		display: flex;
		height: 40px;
		line-height: 40px;
		background-color: #eee;
		font-size: 14px;
		
	}
	.check-content{
		display: flex;
		align-items: center;
		margin-left: 10px;
		width: 60px;
	}
	.check-botton{
		width: 20px;
		height: 20px;
		line-height: 20px;
		margin-right: 5px;
	}
	.price{
		margin-left: 30px;
		flex: 1;
	}
	.catculate{
		background-color: orangered;
		color: #fff;
		width: 90px;
		text-align: center;
	}
</style>

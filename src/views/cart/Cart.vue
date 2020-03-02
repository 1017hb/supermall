<template>
	<div id="cart">
		<nav-bar class="nav-bar"><div slot="center">购物车({{getCartLength}})</div></nav-bar>
		<cart-list/>
		<cart-buttom-bar/>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	
	import {mapGetters} from 'vuex'
	import CartList from './childComps/CartList'
	import CartButtomBar from './childComps/CartButtomBar'
	
	export default {
		name:'Cart',
		data(){
			return{
				cartNumber:1
			}
		},
		components:{
			NavBar,
			CartList,
			CartButtomBar
			
		},
		mounted(){
			//console.log(this.$store.getters)
			//console.log(this.$store.getters.getCartLength)
		},
		computed:{
			...mapGetters(['getCartLength'])
			/* ...mapGetters({
				length:'getCartLength',
				list:'cartList'
			}) */
			/* cartLength(){
				return this.$store.getters.getCartLength
			} */
		}
	}
</script>

<style scoped>
	#cart{
		height: 100vh;
	}
	.nav-bar{
		background-color: var(--color-tint);
		color: #fff;
	}
	
</style>

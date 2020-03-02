import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Cart = () => import('../views/cart/Cart')
const Classify = () => import('../views/classify/Classify')
const Mine = () => import('../views/mine/Mine')
const Detail = () => import('../views/detail/Detail')

Vue.use(VueRouter)

const routes = [
		{
			path:'',
			redirect: '/home'
		},
		{
			path:'/home',
			component:Home
		},
		{
			path:'/cart',
			component:Cart
		},
		{
			path:'/classify',
			component:Classify
		},
		{
			path:'/mine',
			component:Mine
		},
		{
			path:'/detail/:iid',
			component:Detail
		}
	]

const router = new VueRouter({
	routes,
	mode:'history'
})

export default router
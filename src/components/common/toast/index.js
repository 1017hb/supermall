import Toast from "./Toast"
const obj = {}

obj.install = function(Vue){
	//console.log('install 函数')
	//创建组建构造器
	const toastContrustor = Vue.extend(Toast)
	//new的方式，根据组建构造器，可以创建出来一个组建对象
	const toast = new toastContrustor()
	//将组建对象，手动挂在到某一个元素
	toast.$mount(document.createElement('div'))
	//toast.$el对应的就是div
	document.body.appendChild(toast.$el)
	Vue.prototype.$toast = toast;
}
export default obj
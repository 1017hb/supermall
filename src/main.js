import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueFastLoad from 'vue-lazyload'
import toast from 'components/common/toast'


Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
Vue.use(toast)

//解决移动端300毫秒延迟
FastClick.attach(document.body)
Vue.use(VueFastLoad,{
	preLoad: 1,
	loading:require('./assets/img/common/timg.jpg')
})
new Vue({
  render: h => h(App),
	router,
	store,
}).$mount('#app')

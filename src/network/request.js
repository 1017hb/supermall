import axios from 'axios'

export function request(config){
	
		//创建实例
		const instance = axios.create({
			baseURL:'http://123.207.32.32:8000/api/wh',
			//baseURL:'http://106.54.54.237:8000/api/wh',
			//timeout:5000
		})
		//拦截器 axios。interceptors.全局拦截
		//拦截后需要返回
		//请求拦截
		instance.interceptors.request.use(config => {
			
			return config//成功需要返回
		},err => {
			//console.log('未发送成功  失败拦截')
		});

		//响应拦截
		instance.interceptors.response.use(res => {
			//console.log(res)
			return res.data
		},err => {
			console.log(err)
		})
		//发送网络请求
		return instance(config)
} 


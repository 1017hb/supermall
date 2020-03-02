import {
	ADD_COUNTER,
	ADD_TO_CART
} from './mutation_types'

export default {
		addCart(context,payload){
			return new Promise((resolve,reject) => {
				let oldProduct = null;
				 for(let item of context.state.cartList){
					if(item.id === payload.id){
						oldProduct = item
					}
				} 
				if(oldProduct){
					//oldProduct.count +=1;
					//context.commit('addCounter',product)
					context.commit(ADD_COUNTER,oldProduct)
					resolve('当前商品加一')
				}else{
					payload.count = 1;
					//context.state.cartList.push(payload)
					context.commit(ADD_TO_CART,payload)
					resolve('添加商品成功')
				}
				
				/* let product = context.state.cartList.find(item => item.id === payload.id)
				
				if(product){
					//product.count +=1;
					context.commit('addCounter',product)
				}else{
					payload.count = 1;
					//context.state.cartList.push(payload)
					context.commit('addToCart',product)
				} */
				
			})
		}
}
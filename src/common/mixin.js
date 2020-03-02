import {debounce} from './utils';
import BackTop from 'components/content/backTop/BackTop'
//混入 各组件可使用相同的代码
export const itemListenerMixin = {
	date(){
		return{
			itemImgListener:null
		}
	},
	mounted(){
		const refresh = debounce(this.$refs.scroll.refresh,200)		
			this.itemImgListener = () => {
				//this.$refs.scroll.refresh();
				refresh(); 
			}
			this.$bus.$on('itemImageLoad',this.itemImgListener);		
		//console.log('混入')
	}
}
//不能合并函数内
export const backTopMixin = {
	data(){
		return{
			isShowBackTop:false
		}
	},
	methods:{
		backTop(){	
			//回到顶部
			this.$refs.scroll.scrollTo(0,0,500)	
		},
	},
	components:{
		BackTop
	}
}
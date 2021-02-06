<template>
	<div class="bottom-bar">
		<div class="check-content">
			<check-button :is-checked="isSelectAll" @click.native="checkClick" class="check-button"/>
			<span>全选</span>
		</div>
		<div class="price">
			合计：￥{{totalPrice}}
		</div>
		<div class="calculate" @click="isClick">
			结算{{checkLength}}件
		</div>
	</div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'

export default {
  components: { CheckButton },
	name: 'CartBottomBar',
	computed: {
		...mapGetters(["cartList"]),
		totalPrice() {
			return this.$store.state.cartList.filter(item => {
				return item.checked
			}).reduce((preValue, item) => {
				return preValue + item.price * item.count
			}, 0).toFixed(2)
		},
		checkLength() {
			return this.$store.state.cartList.filter(item => item.checked).length
			// 这里的$store.state.可以通过mapgetters辅助函数将store 中的 getter 映射到局部计算属性
		},
		isSelectAll() {
			if(this.cartList.length === 0) return false
			// find函数
			return !this.cartList.find(item => !item.checked)
			// filter函数
			// return !(this,cartList.filter(item => !item.checked).length)
			// for循环
			// for(let item of this.cartList) {
			// 	if(!item.checked) {
			// 		return false
			// 	} 
			// }
			// return true
		}
	},
	methods: {
		checkClick() {
			if(this.isSelectAll) { //全部选中
				this.cartList.forEach(item => {
					item.checked = false
				});
			} else { //部分或全部未选中
				this.cartList.forEach(item => {
					item.checked = true
				});
			}
		},
		isClick() {
			if(this.cartList.length === 0){
				this.$toast.show('没有商品哦', 2000)
			} else if (!this.isSelectAll) {
				this.$toast.show('请选择购买的商品', 2000)
			}
		}
	},
}
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  display: flex;
  height: 60px;
  line-height: 60px;
  bottom: 49px;
  background-color: rgb(100, 113, 151,.05);
	border-radius: 20px;
	width: 100%;
}

.check-content {
	display: flex;
	align-items: center;
	margin-left: 10px;
	font-weight: 700;
	width: 80px;
}

.check-button {
	width: 22px;
	height: 22px;
	line-height: 22px;
	margin-right: 5px;
}

.price {
	flex: 1;
	margin-left: 20px;
	font-weight: 700;
}

.calculate {
	width: 90px;
	height: 45px;
	line-height: 45px;
	text-align: center;
	background-color: rgba(255, 85, 17, .7);
	border-radius: 20px;
	margin: auto;
	font-weight: 700;
}
</style>
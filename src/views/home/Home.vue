<template>
	<div id="home">
		<nav-bar class="home-nav">
			<div slot="center">蘑菇街</div>
		</nav-bar>
		<home-swiper :banners="banners"/>
		<recommend-view :recommends="recommends"/>
		<feature-view/>
		<tab-control class="tab-control" :titles="['流行', '新款', '精选']"/>
		<ul>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
			<li>5</li>
		</ul>
	</div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/tabControl/TabControl'

import {
	getHomeMultidata,
	getHomeGoods
} from 'network/home';

export default {
	name: 'Home',
	components: {
		NavBar,
		HomeSwiper,
		RecommendView,
		FeatureView,
		TabControl
	},
	data() {
		return {
			// result: null
			banners: [],
			recommends: [],
			goods: {
				'pop': {page: 0, list: []},
				'news': {page: 0, list: []},
				'sell': {page: 0, list: []}
			}
		}
	},
	created() {
		// 1.请求多个数据,调用methods中的getHomeMultidataMethods
		this.getHomeMultidataMethods()
		// 2.请求商品数据
		this.getHomeGoodsMethods('pop')
		// this.getHomeGoodsMethods('news')
		// this.getHomeGoodsMethods('sell')
	},
	methods: {
		getHomeMultidataMethods() {
			// 1.请求多个数据
			getHomeMultidata().then((res) => {
				// console.log(res);
				// this.result = res;
				this.banners = res.data.banner.list;
				this.recommends = res.data.recommend.list;
			}).catch((err) => {
				
			});
		},
		getHomeGoodsMethods(type) {
			const page = this.goods[type].page + 1
			getHomeGoods(type, page).then(res => {
				// console.log(res);
				// res.data.list.push(...)
				this.goods[type].list.push(...res.data.list);
				this.goods[type].page += 1
			})
		}
	}
}
</script>

<style>
#home {
	padding-top: 44px;
}

.home-nav {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;
	background-color: var(--color-tint);
	color: white;
}

.tab-control {
	position: sticky;
	top: 44px;
}
</style>
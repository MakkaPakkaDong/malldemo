<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">蘑菇街</div>
    </nav-bar>
		<tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
				ref="tabControl1"
				v-show="isTabFixed"
      />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
				ref="tabControl2"
				:class="{fixed: isTabFixed}"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import {debounce} from "common/utils"

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      // result: null
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
			currentType: "pop",
			isShowBackTop: false,
			topOffsetTop: 0,
			isTabFixed: false,
			saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
	},
	destroyed() {
		console.log('home destroyed');
	},
	activated() {
		// this.$refs.scroll.scrollTo(0, this.saveY, 0)
		this.$refs.scroll.scrollTo(0, this.saveY)
		this.$refs.scroll.refresh()
	},
	deactivated() {
		this.saveY = this.$refs.scroll.getScrollY()
	},
  created() {
    // 1.请求多个数据,调用methods中的getHomeMultidataMethods
    this.getHomeMultidataMethods();
    // 2.请求商品数据
    this.getHomeGoodsMethods("pop");
    this.getHomeGoodsMethods("new");
		this.getHomeGoodsMethods("sell");
	},
	mounted() {
		const refresh = debounce(this.$refs.scroll.refresh, 200)
		// 1. 监听item中图片加载完成
		this.$bus.$on('itemImageLoad', () => {
			// console.log('------');
			// this.$refs.scroll.refresh()
			refresh()
		})
		// 2.获取tabControl的offsettop
		// 组件没有offsettop属性
		// 所有组件都有一个属性$el:用于获取组件中的元素
		// console.log(this.$refs.tabControl.$el.offsetTop);
	},
  methods: {
		// 事件监听相关方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 1:
          this.currentType = "sell";
          break;
			}
			this.$refs.tabControl1.currentIndex = index;
			this.$refs.tabControl2.currentIndex = index;
		},
		backClick() {
			// console.log('123');
			// 第一个scroll是组件Scroll的data的scroll
			// 第二个scroll是ref的值
			// 500毫秒
			// this.$refs.scroll.scroll.scrollTo(0, 0, 500)
			this.$refs.scroll.scrollTo(0, 0)
		},
		loadMore() {
			this.getHomeGoodsMethods(this.currentType)
		},
		contentScroll(position) {
			// console.log(position);
			// 1.判断BackTop是否显示
			this.isShowBackTop = (-position.y) > 1000
			// 2.决定tabControl是否吸顶（position: fixed）
			this.isTabFixed = (-position.y) > this.tabOffsetTop
		},
		swiperImageLoad() {
			// console.log(this.$refs.tabControl.$el.offsetTop);
			this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
		},
    // 网络请求方法
    getHomeMultidataMethods() {
      // 1.请求多个数据
      getHomeMultidata()
        .then((res) => {
          // console.log(res);
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
        .catch((err) => {});
    },
    getHomeGoodsMethods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        // res.data.list.push(...)
        this.goods[type].list.push(...res.data.list);
				this.goods[type].page += 1;
				this.$refs.scroll.finishPullUp()
      });
		}
  },
};
</script>

<style scoped>
#home {
  position: relative;
  /* padding-top: 44px; */
  height: 100vh;
  /* vh: viewport height*/
}

.home-nav {
  background-color: var(--color-tint);
  color: white;
}

.tab-control {
  position: relative;
  z-index: 10;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* .fixed {
	position: fixed;
	left: 0;
	right: 0;
	top: 44px;
} */
/* .content {
	height: calc(100% - 93px);
	height: 300px;
	overflow: hidden;
} */
</style>
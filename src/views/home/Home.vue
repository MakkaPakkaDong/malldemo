<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">蘑菇街</div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
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
			isShowBackTop: false
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 1.请求多个数据,调用methods中的getHomeMultidataMethods
    this.getHomeMultidataMethods();
    // 2.请求商品数据
    this.getHomeGoodsMethods("pop");
    this.getHomeGoodsMethods("new");
    this.getHomeGoodsMethods("sell");
  },
  methods: {
    // 点击事件方法
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
		},
		backClick() {
			// console.log('123');
			// 第一个scroll是组件Scroll的data的scroll
			// 第二个scroll是ref的值
			// 500毫秒
			// this.$refs.scroll.scroll.scrollTo(0, 0, 500)
			this.$refs.scroll.scrollTo(0, 0)
		},
		contentScroll(position) {
			// console.log(position);
			this.isShowBackTop = (-position.y) > 1000
		},
		loadMore() {
			this.getHomeGoodsMethods(this.currentType)
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
/* .content {
	height: calc(100% - 93px);
	height: 300px;
	overflow: hidden;
} */
</style>
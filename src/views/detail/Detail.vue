<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick" />
		<scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <!-- <ul>
				<li v-for="item in $store.state.cartList">
					{{item}}
				</li>
			</ul> -->
			<detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
		<detail-bottom-bar @addCart="addToCart"/>
		<back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
	<!-- <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll> -->
    <!-- <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar> -->
    <!-- <back-top @click.native="backTop" v-show="isShowBackTop"></back-top> -->
    <!-- <toast :message="message" :show="show"></toast> -->
  <!-- </div> -->
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar"

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { itemListenerMixin, backTopMixin } from "common/mixin";
import { debounce } from "common/utils";
import { mapActions } from 'vuex';

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
		DetailCommentInfo,
		DetailBottomBar,
    Scroll,
    GoodsList,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
			getThemeTopY: null,
			currentIndex: 0,
    };
  },
  // created() {
  //   // 1.保存传入的iid
  //   this.iid = this.$route.params.iid;
  //   // 2.根据iid请求详情数据
  //   getDetail(this.iid).then((res) => {
  //     // console.log(res);
  //     const data = res.result;
  //     // 1.获取顶部的图片轮播数据
  //     this.topImages = data.itemInfo.topImages;
  //     // 2.获取商品信息
  //     this.goods = new Goods(
  //       data.itemInfo,
  //       data.columns,
  //       data.shopInfo.services
  //     );
  //     // 3.创建店铺信息对象
  //     this.shop = new Shop(data.shopInfo);
  //     // 4.保存商品的详情数据
  //     this.detailInfo = data.detailInfo;
  //     // 5.获取参数信息
  //     this.paramInfo = new GoodsParam(
  //       data.itemParams.info,
  //       data.itemParams.rule
  //     );
  //     // 6.评论信息
  //     if (data.rate.cRate != 0) {
  //       this.commentInfo = data.rate.list[0];
  //     }
  //     // this.$nextTick(() => {
  //     // 	// 根据最新的数据，对应的Dom渲染完成，而图片未加载完成
  //     // 	this.themeTopYs = []
  //     // 	this.themeTopYs.push(0)
  //     // 	this.themeTopYs.push(this.$refs.param.$el.offsetTop)
  //     // 	this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
  //     // 	this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
  //     // 	console.log(this.themeTopYs);
  //     // })
  //   });
  //   // 3.请求推荐数据
  //   getRecommend().then((res) => {
  //     this.recommends = res.data.list;
  //   });
  //   this.getThemeTopY = debounce(() => {
  //    if (this.$refs.param && this.$refs.comment && this.$refs.recommend) {
  //       this.$nextTick(() => {
  //         //获取不同组件的offsetTop
  //         this.titleTopY = [];
  //         this.titleTopY.push(0);
  //     this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
  //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
  //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
  //         this.titleTopY.push(Number.MAX_VALUE);
  //         console.log("我");
  //       });
  //     }
  //   });
  // },
	created() {
    this.iid = this.$route.params.iid;

    getDetail(this.iid).then((res) => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      this.shop = new Shop(data.shopInfo);

      this.detailInfo = data.detailInfo;

      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });

    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
			this.themeTopYs.push(Number.MAX_VALUE);
			console.log(this.themeTopYs);
    }, 100);
  },
	mounted() {
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    // console.log(this.themeTopYs);
  },
  methods: {
		...mapActions(['addCart']),
    imageLoad() {
      // this.$refs.scroll.refresh()
      this.newRefresh();
      this.getThemeTopY();
    },
   titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
		},
		contentScroll(position) {
			// console.log(position);
			// 1.获取y值
			const positionY = -position.y
			let length = this.themeTopYs.length
			// 注意越界，最后一个MAX不需遍历，所以length-1
			// 2.positionY和主题中进行对比
			for(let i = 0; i < length-1; i++) {
				// if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {					
				// }
				if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
					this.currentIndex = i;
					this.$refs.nav.currentIndex = this.currentIndex
				}
			}
			this.listenShowBackTop(position)

		},
		addToCart() {
			// console.log('detail');
			// 1.获取购物车需要展示的信息
			const product = {}
			product.image = this.topImages[0];
			product.title = this.goods.title;
			product.desc = this.goods.desc;
			product.price = this.goods.realPrice;
			product.iid = this.iid;
			// 2.将商品添加到购物车中
			// this.$store.commit('addCart', product)这是传到mutations
			// 这是传到actions
			// this.$store.dispatch('addCart', product).then(res => {
			// 	console.log(res);
			// })
			// 通过mapActions映射直接调用actions中的addCart方法
			this.addCart(product).then(res => {
				// console.log(res);
				this.$toast.show(res, 2000)
			})
		}
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 10;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>
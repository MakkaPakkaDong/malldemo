<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailBottomBar",
    methods: {
      addToCart() {
				this.$emit('addCart')
				// console.log('addCart');
      }
    }
	}
</script>

<style scoped>
  .bottom-bar {
    height: 58px;
    position: fixed;
    background-color: rgb(255, 255, 255);
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    text-align: center;
		border-top: 1px solid rgba(177, 177, 177, 0.3);
  }

  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item>div {
    flex: 1;
  }

  .bar-left .text {
    font-size: 13px;
  }

  .bar-left .icon {
    display: block;
    width: 26px;
    height: 26px;
    margin: 10px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .service {
    background-position:0 -62px;
  }

  .bar-left .shop {
    background-position:0 -115px;
  }

  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 58px;
		margin:auto
  }

  .bar-right .cart {
		height: 50px;
		line-height: 50px;
    background-color: #f89500;
    color: rgb(255, 255, 255);
		border-top-left-radius: 25px;
		border-bottom-left-radius: 25px;
		font-size: 16px;
  }

  .bar-right .buy {
		height: 50px;
		line-height: 50px;
    background-color: rgb(218, 51, 0);
		border-top-right-radius: 25px;
		font-size: 16px;
		border-bottom-right-radius: 25px;
  }
</style>

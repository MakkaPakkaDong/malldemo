import { debounce } from "./utils"
import BackTop from "components/content/backTop/BackTop"

export const itemListenerMixin = {
	data() {
		return {
			itemImgListener: null,
			newRefresh: null
		}
	},
	mounted() {
		this.newRefresh = debounce(this.$refs.scroll.refresh, 200)
		this.itemImgListener = () => {
			this.newRefresh()
		}
		this.$bus.$on('itemImageLoad', this.itemImgListener)
	}
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > 1000
    }
  },
}

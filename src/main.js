// import { createApp } from 'vue'
import Vue from 'vue'
// import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import store from './store'
import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

// createApp(App).mount('#app')

Vue.config.productionTip = false
// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 使用懒加载的插件
Vue.use(VueLazyLoad, {
	loading: require('./assets/img/common/2.jpg')
})

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})

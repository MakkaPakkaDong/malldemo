// import { createApp } from 'vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'

// createApp(App).mount('#app')

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
	el: '#app',
	router,
	render: h => h(App)
})

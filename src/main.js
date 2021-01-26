// import { createApp } from 'vue'
import Vue from 'vue'
import App from './App'
import router from './router'

// createApp(App).mount('#app')

Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	render: h => h(App)
})

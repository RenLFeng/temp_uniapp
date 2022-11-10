import Vue from 'vue'
import App from './App'
import track from '@/directive/track.js';
// 引入全局uView
import uView from '@/uni_modules/uview-ui'
// import uView from "uview-ui";
Vue.use(uView);

// vuex
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

// 引入请求封装
require('./utils/request/index')(app)

app.$mount()

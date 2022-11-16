import Vue from 'vue'
import App from './App'

import track from '@/directive/track.js';
// 引入全局uView
import uView from '@/uni_modules/uview-ui'
// import uView from '@/node_modules/uview-ui'
// import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
// #ifdef H5
	// 提交前需要注释  本地调试使用
	const vconsole = require('vconsole')	Vue.prototype.$vconsole = new vconsole() // 使用vconsole	// #endif
// vuex
import store from './store'
const app = new Vue({
  store,
  ...App
})
// 引入请求封装
require('./utils/request/index')(app)
app.$mount()

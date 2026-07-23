import Vue from 'vue'
import App from './App.vue'

// video.js —— 原项目直接把 videojs 函数挂到 Vue.prototype.$video
// (对应打包产物里的: i.a.prototype.$video = e.a)
import videojs from 'video.js'

Vue.prototype.$video = videojs
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')

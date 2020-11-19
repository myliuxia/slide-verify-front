import Vue from 'vue'
import App from './App.vue'
import SlideVerify from '../src'

Vue.config.productionTip = false
Vue.use(SlideVerify)

new Vue({
  render: h => h(App)
}).$mount('#app')   

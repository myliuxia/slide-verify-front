
import SlideVerify from './slide-verify.vue'
const install = function (Vue, opts = {}) {
  Vue.component('kr-slide-verify', SlideVerify)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}


export default {
  install,
  SlideVerify
}

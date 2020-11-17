<template>
  <div id="app">
    <slide-verify
      :w="slideInfo.w"
      :h="slideInfo.h"
      :block_w="slideInfo.block_w"
      :block_h="slideInfo.block_h"
      :imgurl="slideInfo.imgurl"
      :block_imgurl="slideInfo.miniimgurl"
      :keyCode="slideInfo.keyCode"
      @refresh="refresh"
      @verify="validSuccess"
      :loading="loading"
    ></slide-verify>
  </div>
</template>
<script>
import SlideVerify from './components/slide-verify.vue'

export default {
  name: 'App',
  components: {
    SlideVerify,
  },
  data() {
    return {
      visible: false,
      slideInfo: {
        w: 320,
        h: 160,
        block_w: 50,
        block_h: 160,
        imgurl: '',
        miniimgurl: '',
        keyCode: '',
      },
      loading: false,
    }
  },
  created() {
    this.getSlideInfo()
  },
  methods: {
    // 滑块成功
    async validSuccess(left, callback) {
      console.log(left)
      setTimeout(() => {
        callback(false)
      }, 2000)
    },
    // 刷新回调方法
    async refresh(callback) {
      let flag = await this.getSlideInfo()
      callback()
    },
    // 获得滑块验证图片等信息
    getSlideInfo() {
      this.loading = true
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.loading = false
          this.slideInfo.imgurl = require('@/assets/image/img.png')
          this.slideInfo.miniimgurl = require('@/assets/image/slide-img.png')
          resolve(true)
        }, 3000)
      })
    },
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

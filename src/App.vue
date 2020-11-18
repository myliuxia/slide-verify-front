<template>
  <div id="app">
    <slide-verify
      :w="slideInfo.w"
      :h="slideInfo.h"
      :block_w="slideInfo.block_w"
      :block_h="slideInfo.block_h"
      :img="slideInfo.img"
      :block_img="slideInfo.miniimg"
      :keyCode="slideInfo.keyCode"
      @refresh="refresh"
      @verify="validSuccess"
      :loading="loading"
    ></slide-verify>
  </div>
</template>
<script>
import SlideVerify from './components/slide-verify.vue'
import axios from 'axios'

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
        img: '',
        miniimg: '',
        id: '',
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
      axios
        .post('/slider/validateCaptcha', {
          id: this.slideInfo.id,
          offsetX: left,
          offsetY: 0,
        })
        .then((response) => {
          let res = response.data.data
          callback(res)
        })
        .catch((error) => {
          console.log(error)
          callback(false)
        })
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
        axios
          .get('/slider/randomCaptcha')
          .then((response) => {
            this.loading = false
            let res = response.data
            this.slideInfo.id = res.data.id
            this.slideInfo.w = res.data.originWidth
            this.slideInfo.h = res.data.originHeight
            this.slideInfo.block_w = res.data.blockWidth
            this.slideInfo.block_h = res.data.blockHeight
            this.slideInfo.img = res.data.bottomLayerImg
            this.slideInfo.miniimg = res.data.sliderLayerImg
            resolve(true)
          })
          .catch((error) => {
            this.loading = false
            resolve(false)
          })
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

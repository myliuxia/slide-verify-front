<template>
  <div class="slide-verify" id="slideVerify" :style="widthlable" onselectstart="return false;">
    <div class="canves-box">
      <canvas :width="w" :height="h" ref="canvas"></canvas>
      <canvas :width="w" :height="h" ref="block" class="slide-verify-block"></canvas>
      <div @click="refresh" class="slide-verify-refresh">
        <img :src="refreshImg" />
      </div>
    </div>
    <div
      class="slide-verify-slider"
      :style="widthlable"
      :class="{
        'container-active': containerActive,
        'container-success': containerSuccess,
        'container-fail': containerFail,
      }"
    >
      <div class="kr-slide-indicator" :style="{ width: sliderMaskWidth }"></div>

      <!-- slider -->
      <div
        @mousedown="sliderDown"
        @mousemove="touchMoveEvent"
        @mouseup="touchEndEvent"
        @touchstart="touchStartEvent"
        class="kr-slider"
        :style="{ left: sliderLeft }"
      >
        <span class="kr-icon kr-icon-huadong"></span>
      </div>
      <span class="kr-slide-text">{{ sliderText }}</span>
    </div>
    <div class="mask-loading" v-show="loading"></div>
  </div>
</template>
<script>
import '@/assets/iconfont/iconfont.css'
/**
 * @description 滑块验证组件
 * @property {Number} w 画布宽度
 * @property {Number} h 画布宽度
 * @property {Number} block_w 滑块宽度
 * @property {Number} block_h 滑块宽度
 * @property {String} sliderText 滑动操作栏提示文字
 * @property {String} imgurl 画布图片地址
 * @property {String} block_imgurl 滑块图片地址
 * @property {Boolean} loading 加载标识
 * @event {Function} refresh 刷新回调方法
 * @event {Function} success 滑块确认回调方法，参数 left：横坐标滑动量
 */
// const PI = Math.PI;

// function sum(x, y) {
//   return x + y;
// }

// function square(x) {
//   return x * x;
// }

export default {
  name: 'SlideVerify',
  props: {
    // canvas width
    w: {
      type: Number,
      default: 320,
    },
    // canvas height
    h: {
      type: Number,
      default: 160,
    },
    block_w: {
      type: Number,
      default: 50,
    },
    block_h: {
      type: Number,
      default: 160,
    },
    sliderText: {
      type: String,
      default: '向右拖动滑块填充拼图',
    },
    imgurl: {
      type: String,
      default: '',
    },
    block_imgurl: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    keyCode: [String, Number],
  },
  data() {
    return {
      containerActive: false, // container active class
      containerSuccess: false, // container success class
      containerFail: false, // container fail class
      canvasCtx: null,
      blockCtx: null,
      block: null,
      canvasStr: null,
      img: undefined,
      originX: undefined,
      originY: undefined,
      isMouseDown: false,
      trail: [],
      widthlable: '',
      sliderLeft: 0, // block right offset
      sliderMaskWidth: 0, // mask width
      refreshImg: require('@/assets/image/refresh.png'),
    }
  },
  watch: {
    keyCode() {
      this.reset()
    },
  },
  mounted() {
    this.init()
    this.initImg()
  },
  methods: {
    init() {
      this.initDom()
      this.widthlable = 'width:' + this.w + 'px;'
    },
    initDom() {
      this.block = this.$refs.block
      this.canvasStr = this.$refs.canvas
      this.canvasCtx = this.canvasStr.getContext('2d')
      this.blockCtx = this.block.getContext('2d')
    },
    initImg() {
      var that = this
      const img = document.createElement('img')
      img.onload = onload
      img.onerror = () => {
        img.src = that.imgurl
      }
      img.src = that.imgurl
      img.onload = function () {
        that.canvasCtx.drawImage(img, 0, 0, that.w, that.h)
      }

      this.img = img
      const img1 = document.createElement('img')
      var blockCtx = that.blockCtx
      img1.onerror = () => {
        img1.src = that.block_imgurl
      }
      img1.src = that.block_imgurl
      img1.onload = function () {
        blockCtx.drawImage(img1, 0, 0, that.block_w, that.block_h)
      }
    },
    refresh() {
      this.$emit('refresh')
    },
    sliderDown(event) {
      this.originX = event.clientX
      this.originY = event.clientY
      this.isMouseDown = true
    },
    touchStartEvent(e) {
      this.originX = e.changedTouches[0].pageX
      this.originY = e.changedTouches[0].pageY
      this.isMouseDown = true
    },

    touchMoveEvent(e) {
      if (!this.isMouseDown) return false
      const moveX = e.clientX - this.originX
      const moveY = e.clientY - this.originY
      if (moveX < 0 || moveX + 38 >= this.w) return false
      this.sliderLeft = moveX + 'px'
      let blockLeft = ((this.w - this.block_w) / (this.w - 40)) * moveX
      this.block.style.left = blockLeft + 'px'

      this.containerActive = true
      this.sliderMaskWidth = 40 + moveX + 'px'
      this.trail.push(moveY)
    },
    touchEndEvent(e) {
      if (!this.isMouseDown) return false
      this.isMouseDown = false
      if (e.clientX === this.originX) {
        this.containerActive = false
        return false
      }
      this.verify()
    },
    verify() {
      const left = parseInt(this.block.style.left)
      this.containerActive = false
      this.$emit('verify', left)
    },
    reset() {
      this.containerActive = false
      this.containerSuccess = false
      this.containerFail = false
      this.sliderLeft = 0
      this.block.style.left = 0
      this.sliderMaskWidth = 0
      this.canvasCtx.clearRect(0, 0, this.w, this.h)
      this.blockCtx.clearRect(0, 0, this.w, this.h)
      this.initImg()
    },
  },
}
</script>
<style lang="scss">
@import '@/assets/style/slide-verify.scss';
</style>

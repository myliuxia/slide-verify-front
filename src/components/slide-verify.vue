<template>
  <div class="slide-verify" id="slideVerify" :style="style" onselectstart="return false;">
    <div class="canves-box">
      <canvas :width="w" :height="h" ref="canvas"></canvas>
      <canvas :width="w" :height="h" ref="block" class="slide-verify-block"></canvas>
      <div @click="refresh" class="slide-verify-refresh">
        <img :src="refreshImg" />
      </div>
    </div>
    <div
      class="slide-verify-slider"
      :class="{
        'container-active': status == 'active',
        'container-success': status == 'success',
        'container-fail': status == 'fail',
      }"
    >
      <div class="kr-slide-indicator" :style="slideIndicatorStyle"></div>

      <!-- slider -->
      <div @mousedown="mouseDownEvent" class="kr-slider" :style="sliderStyle">
        <span v-if="verifying" class="kr-icon kr-icon-loading animation"></span>
        <span
          v-else
          class="kr-icon"
          :class="{
            'kr-icon-arrow-right': status == 'origin' ||status == 'active' ,
            'kr-icon-select': status == 'success',
            'kr-icon-close': status == 'fail',
          }"
        ></span>
      </div>
      <span class="kr-slide-text">{{ sliderText }}</span>
    </div>
    <div class="mask-loading" v-show="loading">
      <span class="kr-icon kr-icon-loading animation"></span>
    </div>
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
    keyCode: [String, Number],
  },
  data() {
    return {
      loading: false, // 加载中
      verifying: false, // 验证中
      status: 'origin', // 状态 origin：原始状态；active:拖动激活状态；success:验证成功；fail:验证失败
      canvasCtx: null,
      blockCtx: null,
      block: null,
      canvasStr: null,
      // 原始坐标
      originX: undefined,
      originY: undefined,
      sliderLeft: 0, // 滑块偏移量
      refreshImg: require('@/assets/image/refresh.png'),
    }
  },
  computed: {
    style() {
      return { width: this.w + 'px' }
    },
    sliderStyle() {
      return { left: this.sliderLeft + 'px' }
    },
    slideIndicatorStyle() {
      return { width: this.sliderLeft + 40 + 'px' }
    },
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
      this.loading = true
      this.$emit('refresh', (val) => {
        this.reset()
        this.loading = false
      })
    },
    // 鼠标点击
    mouseDownEvent(e) {
      e.preventDefault && e.preventDefault()
      e.stopPropagation && e.stopPropagation()
      this.originX = e.clientX
      this.originY = e.clientY
      document.addEventListener('mousemove', this.mouseMoveEvent, false)
      document.addEventListener('mouseup', this.mouseUpEvent, false)
    },

    mouseMoveEvent(e) {
      e.preventDefault && e.preventDefault()
      e.stopPropagation && e.stopPropagation()
      this.status = 'active'
      const moveX = e.clientX - this.originX
      const moveY = e.clientY - this.originY
      if (moveX < 0) {
        this.sliderLeft = 0
        this.block.style.left = 0
      } else if (moveX + 40 >= this.w) {
        this.sliderLeft = this.w - 40
        this.block.style.left = this.w - this.block_w + 'px'
      } else {
        this.sliderLeft = moveX
        let blockLeft = ((this.w - this.block_w) / (this.w - 40)) * moveX
        this.block.style.left = blockLeft + 'px'
      }
    },

    mouseUpEvent(e) {
      console.log('mouseup')
      document.removeEventListener('mousemove', this.mouseMoveEvent, false)
      document.removeEventListener('mouseup', this.mouseUpEvent, false)
      this.verify()
    },

    verify() {
      const left = parseInt(this.block.style.left)
      this.verifying = true
      this.$emit('verify', left, (result = true) => {
        this.verifying = false
        if (result) {
          // 验证通过
          this.status = 'success'
        } else {
          // 验证不通过
          this.status = 'fail'
          this.refresh()
        }
      })
    },

    reset() {
      this.status = 'origin'
      this.verifying = false
      this.sliderLeft = 0
      this.block.style.left = 0
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

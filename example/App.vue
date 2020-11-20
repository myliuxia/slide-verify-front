<template>
  <div id="app">
    <div class="box">
      <div class="title">kr-slide-verify 滑块验证示例</div>
      <div class="verify-box" v-if="verify">
        <kr-slide-verify
          :w="slideInfo.w"
          :h="slideInfo.h"
          :block_w="slideInfo.block_w"
          :block_h="slideInfo.block_h"
          :img="slideInfo.img"
          :block_img="slideInfo.miniimg"
          :keyCode="slideInfo.keyCode"
          @refresh="refresh"
          @verify="valid"
          :loading="loading"
        ></kr-slide-verify>
      </div>
      <div v-else class="login">
        <div class="logo">LOGO</div>
        <div class="row">
          <input class="input" placeholder="用户名" :value="'滑块验证'" disabled />
        </div>
        <div class="row">
          <input class="input" type="password" :value="'12345678'" disabled placeholder="密码" />
        </div>
        <div class="row">
          <button class="button" @click="loginVerify">登 陆</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'App',
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
      verify: false,
    }
  },
  created() {},
  methods: {
    loginVerify() {
      this.getSlideInfo()
      this.verify = true
    },
    // 滑块成功
    async valid(left, callback) {
      axios
        .post('/slider/validateCaptcha', {
          id: this.slideInfo.id,
          offsetX: left,
          offsetY: 0,
        })
        .then((response) => {
          let res = response.data.data
          if (res) {
            // 验证成功
            setTimeout(() => {
              location.reload()
            }, 1000)
            callback(true)
          } else {
            // 验证失败
            callback(false)
          }
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
}
.box {
  width: 1000px;
  margin: auto;
  padding: 10px 0;
  font-family: Arial, Helvetica, sans-serif;
}
.title {
  text-align: center;
  font-size: 24px;
  color: #1890ff;
  margin: 20px;
  font-weight: bold;
  padding: 20px 0 40px;
}

.login {
  width: 360px;
  box-sizing: border-box;
  padding: 20px;
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 0 4px 4px #eeeeee;
  background: #ffffff;
  position: relative;
  .logo {
    font-size: 24px;
    color: #1890ff;
    text-align: center;
    padding: 20px 0 30px;
  }
  .row {
    height: 40px;
    margin-bottom: 20px;
  }
  .input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    font-size: 14px;
  }
  .button {
    width: 100%;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #1890ff;
    border: 1px solid #1890ff;
    color: #fff;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
}

.verify-box {
  width: 360px;
  box-sizing: border-box;
  padding: 20px;
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 0 4px 4px #eeeeee;
  background: #ffffff;
}
</style>

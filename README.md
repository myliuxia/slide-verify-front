# kr-slide-verify
### 简介
一个基于Vue的滑块验证组件，该组件可配后[后端](https://code.keywaysoft.com/F-00469/captcha)代码实现滑块验证功能！

### 安装与使用
npm安装组件
```
npm install kr-slide-verity

```

引入
``` javascript
import Vue from 'vue'
import KrSlideVerify from "kr-slide-verify"
import 'kr-slide-verify/lib/kr-slide-verify.css'

Vue.use(KrSlideVerify)
```

使用
```html
  <kr-slide-verify
    :w="slideInfo.w"
    :h="slideInfo.h"
    :block_w="slideInfo.block_w"
    :block_h="slideInfo.block_h"
    :img="slideInfo.img"
    :block_img="slideInfo.miniimg"
    :loading="loading"
    @refresh="refresh"
    @verify="valid"
  ></kr-slide-verify>
```

## Attributes
| 参数 |                   说明                   | 类型    | 可选值                    | 默认值              |
| --------- | -------------------------------------- | ------- | ------------------------- | ------------------ |
| w | 画布宽度 | Number | —— | 320 |
| h | 画布高度 | Number | —— | 160 |
| block_w | 滑块宽度 | Number | —— | 50 |
| block_h | 滑块高度 | Number | —— | 160 |
| img | 画布背景图地址 | String | —— | —— |
| block_img | 滑块图片地址 | String | —— | —— |
| sliderText | 操作提示文字 | String | —— | '向右拖动滑块填充拼图' |
| loading | 加载标识 | String | true/false | false |

## Events

| 事件名称 |      说明      | 回调参数               |
| ------- | ------------ | ---------------------- |
| refresh | 刷新滑块验证时触发 | (callback:Function) |
| verify | 验证滑块位置时触发 | (left:Number,callback:Function) left:滑块向右的滑动量 |

module.exports = {
  publicPath: './',
  pages: {
    index: {
      // page 的入口
      entry: 'example/main.js',
      // 模板来源
      template: 'example/index.html',
    },
  },
  // 代理配置
  devServer: {
    publicPath: '/',
    proxy: {
      '/slider': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
    },
  }
}
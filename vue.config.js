module.exports = {
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
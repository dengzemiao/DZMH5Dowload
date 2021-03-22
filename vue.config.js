module.exports = {
  devServer: {
    // 端口号
    port: 8080,
    // 配置不同的后台API地址
    proxy: {
      '/dowload1': {
        target: 'https://gimg2.baidu.com',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/dowload1': ''
        }
      },
      '/dowload2': {
        target: 'https://scpic.chinaz.net',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/dowload2': ''
        }
      }
    }
  }
}
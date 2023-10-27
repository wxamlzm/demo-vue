/*
 * @Author: zd
 * @Date: 2023-10-27 15:57:45
 * @LastEditors: zd
 * @LastEditTime: 2023-10-27 16:02:22
 * @FilePath: \demo-vue\vue.config.js
 * @Description:
 */
module.exports = {
  publicPath: './',

  css: {
    loaderOptions: {
      // 给 stylus-loader 传递选项
      stylus: {
        import: '~@/stylus/default.styl'
      }
    }
  }
}

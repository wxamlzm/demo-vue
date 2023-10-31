/*
 * @Author: zd
 * @Date: 2023-10-27 15:57:45
 * @LastEditors: zd
 * @LastEditTime: 2023-10-31 09:45:55
 * @FilePath: \demo-vue\vue.config.js
 * @Description:
 */
module.exports = {
  publicPath: './',

  lintOnSave: false,

  css: {
    loaderOptions: {
      // 给 stylus-loader 传递选项
      stylus: {
        import: '~@/stylus/default.styl'
      }
    }
  }
}

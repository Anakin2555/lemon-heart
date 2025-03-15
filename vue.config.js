const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    css: {
        extract: false,//false表示开发环境,true表示生成环境
        sourceMap: false,
        loaderOptions: {
          postcss: {
            plugins: [
              require("postcss-px-to-viewport")({
                unitToConvert: "px",    // 需要转换的单位，默认为"px"
                viewportWidth: 1920,   // 视窗的宽度，对应pc设计稿的宽度，一般是1920
                viewportHeight: 1080,// 视窗的高度，对应的是我们设计稿的高度,我做的是大屏监控,高度就是1080
                unitPrecision: 3,        // 单位转换后保留的精度
                propList: [        // 能转化为vw的属性列表
                  "*"
                ],
                viewportUnit: "vw",        // 希望使用的视口单位
                fontViewportUnit: "vw",        // 字体使用的视口单位
                selectorBlackList: [],    // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
                minPixelValue: 1,        // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
                mediaQuery: false,        // 媒体查询里的单位是否需要转换单位
                replace: true,        // 是否直接更换属性值，而不添加备用属性
                exclude: /(\/|\\)(node_modules)(\/|\\)/,        // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
              })
            ]
          }
        }
      },
  // 生产环境不生成 sourceMap
  productionSourceMap: false,

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 生产环境优化配置
      return {
        plugins: [
          // gzip 压缩
          new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css)$/,
            threshold: 10240,
            minRatio: 0.8
          }),
          // 打包分析
          new BundleAnalyzerPlugin()
        ],
        optimization: {
          // 代码分割配置
          splitChains: {
            chunks: 'all',
            cacheGroups: {
              libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial'
              },
              elementUI: {
                name: 'chunk-elementUI',
                priority: 20,
                test: /[\\/]node_modules[\\/]_?element-ui(.*)/
              },
              commons: {
                name: 'chunk-commons',
                test: path.resolve(__dirname, 'src/components'),
                minChunks: 2,
                priority: 5,
                reuseExistingChunk: true
              }
            }
          }
        }
      }
    }
  },

  chainWebpack: config => {
    // // 移除 prefetch 插件
    // config.plugins.delete('prefetch')
    
    // // 图片压缩
    // config.module
    //   .rule('images')
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     bypassOnDebug: true
    //   })
    //   .end()
  }
}
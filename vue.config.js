
//返回是否为生产环境还是开发环境
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
    outputDir: 'dist',
    runtimeCompiler: true, //关键点在这
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
            args[0].title= 'Admin'
            return args
            })
    },
    devServer: {
        proxy: {
            '/shiwan': {
                target: 'http://192.168.10.39:8080/MangoWebsite/', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/shiwan': ''
                }
            },
            '/code': {
                target: 'http://192.168.10.39:8070/MangoWebsite/', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/code': ''
                }
            },
            '/api': {
                target: 'http://10.0.5.100:6070/index.php/', //对应自己的接口
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,

}
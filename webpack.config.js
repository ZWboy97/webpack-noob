var path = require('path');

var htmlWebpackPlugin = require('html-webpack-plugin'); // 基于已有的index.js模板，将webpack打包后的js包文件自动引入到index.html中

module.exports = {
    entry: {    // 打包入口,可以是多输入，可以实现多页面
        page1: './page1.js',
        page2: ['./word.js', './page2.js']
    },
    output: {   // 打包输出
        path: path.resolve(__dirname, './build'),
        filename: 'js/[name].bundle.js',   // 当是多输入的时候，输出要提供占位符
        chunkFilename: 'js/[id].bundle.js'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './public/index.html', // 指定打包后生成的index.html的模板
            inject: 'head', // js插入到head位置
            data: '来自htmlWebpackPlugin的参数', // 配置一些参数，可以html中读取
        })
    ]
}
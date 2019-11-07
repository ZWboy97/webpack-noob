var path = require('path');

var htmlWebpackPlugin = require('html-webpack-plugin'); // 基于已有的index.js模板，将webpack打包后的js包文件自动引入到index.html中

module.exports = {
    entry: {    // 打包入口,可以是多输入，实现多页面
        page1: './page1.js',
        page2: ['./word.js', './page2.js']
    },
    output: {   // 打包输出
        path: path.resolve(__dirname, './build'),
        filename: 'js/[name].bundle.js',   // 当是多输入的时候，输出要提供占位符
        publicPath: 'https://cnd.com/'      // 可以用于生产环境打包，直接将js等自动换成cdn上的地址。
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './public/index.html', // 指定打包后生成的index.html的模板
            filename: 'page1.html',          // 打包后输出的文件
            inject: 'head', // js插入到head位置
            data: '来自htmlWebpackPlugin的参数', // 配置一些参数，可以html中读取,通过<%= 
            title: 'This is page1',
            minify: {   // 进行压缩
                removeComments: true // 还有很多优化规则
            },
            chunks: ['page1', 'page2']
        }),
        new htmlWebpackPlugin({
            template: './public/index.html', // 指定打包后生成的index.html的模板
            filename: 'page2.html',
            title: 'This is page2',
            inject: "body",
            chunks: ['page2']
        }),
    ],
    module: {
        rules: [    // 规则列表
            {   // babel 加载ES6代码
                test: /\.js$/,  // 匹配
                loader: 'babel',   // 使用哪种loader加载
                include: path.resolve(__dirname, 'src'),    // 指定加载的路径
                exclude: path.resolve(__dirname, 'node_modules'),   // 排除加载的路径
                query: {
                    presets: ['latest'] // 转换所有的ES6
                }
            },
            {
                test: /\.css$/,  // 匹配
                loader: 'style-loader!css-loader',   // 先使用css-loader加载css文件，然后再将结果加载到html中的style标签中
                exclude: path.resolve(__dirname, 'node_modules'),
            }
        ]
    }
}
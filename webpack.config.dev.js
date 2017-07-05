import webpack from 'webpack';
import path from 'path';

export default {
    debug:false,
    devtool:'cheap-module-eval-source-map',
    noInfo:false,
    entry:[
        'eventsource-polyfill', // required for hot reloading in Internet explorer
        'webpack-hot-middleware/client?reload=true',// it reload the page when hot module fails to reload
        './src/index.js'
    ],
    target:'web',
    output:{
        path:__dirname+'/dist/', // in dev mode no such files created but in production build file will be created in this folder
        filename:'bundle.js',
        publicPath:'/'
    },
    devServer: {
      contentBase: './src'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    module:{
        loaders:[
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loaders: ['babel']
            },
            {
                test: /(\.css)$/,
                loaders: ['style', 'css']
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.(woff|woff2)$/,
                loader: "url?prefix=font/&limit=5000"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }
        ]
    }
};

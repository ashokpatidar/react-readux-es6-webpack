import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
const GLOBALS = {
  'process.env.NODE_ENV':JSON.stringify('production')
};

export default {
    debug:false,
    devtool:'source-map',
    noInfo:false,
    entry: './src/index.js',
    target:'web',
    output:{
        path:__dirname+'/dist/', // in dev mode no such files created but in production build file will be created in this folder
        filename:'bundle.js',
        publicPath:'/'
    },
    devServer: {
      contentBase: './dist'
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),  // optimize the order of the file in which they are bundled in for optimal minification
      new webpack.DefinePlugin(GLOBALS), // remove the features like Proptypes in the library
      new ExtractTextPlugin('styles.css'), // extract our css file in seprate bundles
      new webpack.optimize.DedupePlugin(), //  it remove the duplicate package from our bundle to keep the bundle size small
      new webpack.optimize.UglifyJsPlugin() // minify our javascript

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
                loader: ExtractTextPlugin.extract("css?sourceMap")
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

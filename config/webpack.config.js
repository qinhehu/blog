var webpack = require('webpack');

module.exports = {
    entry: {
        markdown:'./react/markdown.js',
        article_preview:'./react/article_preview.js',
        tag:'./react/tag.js'
    },
    output: {
        path: __dirname + '/static',
        filename: '[name].js',
        publicPath: '/static'
    },
    module: {
        loaders: [
          {
              test: /\.jsx$/,
              loader: 'babel-loader',
              exclude: /(node_modules|bower_components)/,
              query: {presets: ['react', 'es2015']}
          },
          {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /(node_modules|bower_components)/,
              query: {presets: ['react', 'es2015']}
          }
        ]
    }
}

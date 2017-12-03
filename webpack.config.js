const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

module.exports = {
    entry: './public/javascripts/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js'
    },
    module: {
   rules: [
     {
       test: /\.css$/,
       use: ExtractTextPlugin.extract({
         fallback: "style-loader",
         use: "css-loader"
       })
     }
   ]
 },
 plugins: [
   new ExtractTextPlugin("styles.css"),
 ]
};

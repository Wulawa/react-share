const path = require('path');
// const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: './libs/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-share.min.js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ["transform-class-properties"]            
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          "css-loader",
          'less-loader',
          {
            loader:"postcss-loader",
            options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
              plugins: (loader) => [
                require("autoprefixer")(), //CSS浏览器兼容
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader'
      },
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      containers: path.resolve(__dirname, 'src/containers/'),
      static: path.resolve(__dirname, 'src/static/'),
      theme: path.resolve(__dirname, 'src/theme/'),
    },
    extensions: [
      '.js',
      '.jsx'
    ],
    modules: [
      path.resolve(__dirname, 'src/'),
      path.resolve(__dirname, 'node_modules/'),
    ]
  },
  //   plugins: [
  //     new HtmlWebPackPlugin({
  //       template: path.resolve(__dirname, 'src/index.html'),
  //       filename: "./index.html"
  //     })
  //   ]
};
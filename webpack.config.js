const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/Scripts/app.ts',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // sass for modifying bulma vars
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
              // options...
            }
          }
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg|ogg|mp3)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[hash]-[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname + '/dist'),
    // this is needed to for live reloading:
    publicPath: '/dist/'
  },
  // this enables live reloading! none else works!
  devServer: {
    watchContentBase: true
  },
  mode: 'development',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/global_style.css'
    })
  ]
};

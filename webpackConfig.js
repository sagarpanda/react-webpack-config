/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//const ROOT_DIR = path.resolve(__dirname, '../../');
const ROOT_DIR = path.resolve(__dirname);
const PUB_DIR = path.resolve(ROOT_DIR, 'public');

function htmlPublish() {
  return new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, 'index-build.html')
  })
}

const config = {
  entry: `${ROOT_DIR}/app/main.js`,
  output: {
    path: PUB_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
          options: {
            modules: true,
            sourceMap: true
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      rootSource: path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    htmlPublish()
  ],
  devtool: 'source-map',
  devServer: { inline: true, port: 3000 }
};

export default config;

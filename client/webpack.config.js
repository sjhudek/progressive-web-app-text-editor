const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './client/src/js/index.js',  // Adjust this path
      install: './client/src/js/install.js'  // Adjust this path
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/index.html',
        filename: 'index.html'
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        name: 'Your App Name',
        short_name: 'App',
        description: 'Your App Description',
        background_color: '#ffffff',
        crossorigin: 'use-credentials',
        icons: [
          {
            src: path.resolve('client/src/images/logo.png'), // Correcting the icon path
            sizes: [96, 128, 192, 256, 384, 512]
          }
        ]
      }),
      new InjectManifest({
        swSrc: './client/src-sw.js'
      })
    ],

    "presets": [
      ["@babel/preset-env", {
        "useBuiltIns": "entry",
        "corejs": 3
      }]
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ],
    },
  };
};
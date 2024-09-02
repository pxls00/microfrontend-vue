import {Configuration, ProgressPlugin} from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import {VueLoaderPlugin} from 'vue-loader'


import { BuildOptions } from './types/types'
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import CopyPlugin from 'copy-webpack-plugin'

export function buildPlugins(options: BuildOptions):Configuration['plugins'] {
  const isDev = options.mode === 'development'

  const plugins:Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: options.paths.html,
      favicon: options.paths.favicon, // favicon
      publicPath: '/'
    }), // Html webpack plugin useful for webpack bundles that include a hash in the filename which changes every compilation
    new VueLoaderPlugin(), // vue loader plugin
    // new ForkTsCheckerWebpackPlugin() // fork check which takes type checking process to another head to get performance in building  your project.

  ]

  if(isDev) {
    plugins.push(new ProgressPlugin())
    
  }else {
    plugins.push(new  MiniCssExtractPlugin({ // mini css extract, works when its production
      filename: 'css/[name].[contenthash:8].css', // configure file name
      chunkFilename: 'css/[name].contenthash:8].css'
    }))
    plugins.push(new CopyPlugin({
        patterns: options.paths.copyFolders
      }),
    )

  }

  return plugins
}
import webpack from 'webpack'
import { buildResolvers } from './buildResolvers'
import { buildDevServer } from './buildDevServer'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'

import { BuildOptions } from './types/types'

export function build (options: BuildOptions): webpack.Configuration {

  const isDev = options.mode === 'development'


  return {
    mode: options.mode ?? "development", // there two enum values "development" and "build", as you've already gueessed build is for optimization, pressing, without comments and so on.
    entry: options.paths.entry,
    // entry: { creating several entrypoints
    //   a2: 'dependingfile.js',
    //   b2: {
    //     dependOn: 'a2', current entry point depends on a2
    //     import: './src/app.js',
    //   },
    // },
    output: {
      path: options.paths.output,
      filename: '[name].[contenthash].js',
      // filename: '[name].[contenthash].js', name is name of entry key defauls is "main". contenthash is to create hash outof content to avoid caching browser files
      clean: true, // clean build folder eavery upon startup
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devServer: buildDevServer(options),
    devtool: 'source-map', // turn on source map
  }
}
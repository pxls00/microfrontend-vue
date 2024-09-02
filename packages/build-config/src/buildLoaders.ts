import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const tsxLoader = {
    // Loader processor for compilation tsx to js
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: /node_modules/,
    options: {
      appendTsSuffixTo: [/\.vue$/], // add his parameter when you added vue-loader
      transpileOnly: true
    },
  };

  const vueLoader = {
    // Loader processor for compilation vue
    test: /\.vue$/,
    loader: 'vue-loader',
  };

  const scssLoader = {
    // Loader processor for style, css, scss
    test: /\.s[ac]ss$/i,
    use: [
      // extract css loader or style-loader depend on runnning mode
      isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      'css-loader',
      // Compiles Sass to CSS
      'sass-loader',
    ],
  };

  const urlLoader = {
    // Loader processor for url-loader (images, icons)
    test: /\.(png|jpg|gif|svg)$/,
    loader: 'url-loader',
    options: {
      limit: 8192,
      name: '[name].[ext]?[hash]',
    },
  };

  const fileLoader = {
    // Loader processor for files
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]?[hash]',
    },
  };

  const buildLoaders = [
    tsxLoader,
    vueLoader,
    scssLoader,
    urlLoader,
    fileLoader,
  ];

  return buildLoaders;
}

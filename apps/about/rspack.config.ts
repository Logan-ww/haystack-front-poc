import { composePlugins, withNx, withReact } from '@nx/rspack';
import { withModuleFederation } from '@nx/rspack/module-federation';

import baseConfig from './module-federation.config';
import { Configuration } from '@rspack/cli';
import { SharedConfigContext } from '@nx/rspack/src/utils/model.js';

const Rsconfig: Configuration = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/, // Exclude CSS Modules
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.module\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: import('./styleLoader.js'),
            },
          },
          // {
          //   loader: 'css-loader',
          //   options: {
          //     modules: true,
          //   },
          // },
          'css-loader',
          // 'postcss-loader',   

        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

// 'postcss-loader', 'sass-loader'

const config = {
  ...baseConfig,
};

// Nx plugins for rspack to build config object from Nx options and context.
/**
 * DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support Module Federation
 * The DTS Plugin can be enabled by setting dts: true
 * Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html
 */
export default composePlugins(
  // (config: Configuration)=> {
  //   const newConfig = {
  //     ...config,
  //     Rsconfig
  //   }
  //   return newConfig;
  // },
  withNx()(Rsconfig, {} as SharedConfigContext),
  withReact(),
  withModuleFederation(config, { dts: false }),
);

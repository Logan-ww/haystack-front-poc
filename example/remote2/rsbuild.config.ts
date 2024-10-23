import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  server: {
    port: 2002,
  },
  // output: {
  //   cssModules: {
  //     auto: true
  //   }
  // },
  tools: {
    rspack: {
      plugins: []
    },
    postcss: (opts) => {
      const postcssModules = require('postcss-modules')({
        generateScopedName: "[name]__[local]___[hash:base64:5]",
		    hashPrefix: "prefix",
      });
      opts.postcssOptions.plugins.push(postcssModules);
      // const prefixerPlugin= require('postcss-selector-prefixer')();
      // opts.postcssOptions.plugins.push(prefixerPlugin);
    },
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'remote2',
      exposes: {
        './export-app': './src/export-app.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
});

const { composePlugins, withNx, withReact } = require('@nx/rspack');
// import { pluginReact } from '@rsbuild/plugin-react';
// import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
const { pluginReact } = require('@rsbuild/plugin-react');
const { pluginModuleFederation } = require('@module-federation/rsbuild-plugin');


module.exports = composePlugins(withNx(), withReact(), (config) => {

  config.plugins.push(pluginReact());
  config.plugins.push( pluginModuleFederation({
    name: 'remote1',
    exposes: {
      './export-app': './src/export-App.tsx',
    },
    shared: ['react', 'react-dom'],
  }));
  return config;
});

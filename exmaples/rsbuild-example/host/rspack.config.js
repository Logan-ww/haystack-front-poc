const { composePlugins, withNx, withReact } = require('@nx/rspack');
const { pluginReact } = require('@rsbuild/plugin-react');
const { pluginModuleFederation } = require('@module-federation/rsbuild-plugin');
// import { pluginReact } from '@rsbuild/plugin-react';
// import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

module.exports = composePlugins(withNx(), withReact(), (config) => {
  config.plugins.push(pluginReact());
  config.plugins.push(pluginModuleFederation({
    name: 'federation_consumer',
    shareStrategy: 'loaded-first',
    remotes: {
      remote1: 'remote1@http://localhost:2001/mf-manifest.json',
    },
    shared: ['react', 'react-dom', 'antd'],
  }));

  return config;
});

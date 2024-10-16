const { composePlugins, withNx, withReact } = require('@nx/rspack');
// import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');

module.exports = composePlugins(withNx(), withReact(), (config) => {
  const moduleFederationPlugin = new ModuleFederationPlugin({
    name: 'remote1',
    filename: 'remoteEntry.js',
    getPublicPath: 'http://localhost:4201/',
    exposes: {
      // './export-app': './src/export-App.tsx',
      './export-app': './src/remoteEntry.tsx',
    },
    shared: ['react', 'react-dom'],
  })
  config.plugins.push(moduleFederationPlugin);
  return config;
});

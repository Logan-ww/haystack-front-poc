const { composePlugins, withNx, withReact } = require('@nx/rspack');
const { ModuleFederationPlugin} = require('@module-federation/enhanced/rspack');

module.exports = composePlugins(withNx(), withReact(), (config) => {
  const moduleFederationPlugin = new ModuleFederationPlugin({
    name: 'host',
    remotes: {
       remote1: 'remote1@http://localhost:4201/remoteEntry.js',
        // remote1: {
        //   entry: 'remote1@http://localhost:4201/remoteEntry.js',
        //   type: 'module'
        // },
        // remote1: {
        //   entry: 'remote1@http://localhost:4201/mf-manifest.json',
        //   type: 'module'
        // },
        // remote1: 'remote1@http://localhost:4201/mf-manifest.json',
      },
      // shared: ['react', 'react-dom'],
  })
  config.plugins.push(moduleFederationPlugin);
  return config;
});

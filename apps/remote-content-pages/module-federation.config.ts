import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'remote-content-pages',

  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;

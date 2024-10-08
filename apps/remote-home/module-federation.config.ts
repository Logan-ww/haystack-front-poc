import { ModuleFederationConfig } from '@nx/rspack/module-federation';

const config: ModuleFederationConfig = {
  name: 'remote-home',

  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;

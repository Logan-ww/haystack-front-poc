import { ModuleFederationConfig } from '@nx/rspack/module-federation';

const config: ModuleFederationConfig = {
  name: 'cart',

  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;

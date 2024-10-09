import { ModuleFederationConfig } from '@nx/rspack/module-federation';

const config: ModuleFederationConfig = {
  name: 'shop',

  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;

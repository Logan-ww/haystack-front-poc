import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import path from 'path';

export default defineConfig({
  source: {
    // Prevent pnpm workspace from causing dev dependencies on npm to take effect
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },
  server: {
    port: 2000,
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'federation_consumer',
      shareStrategy: 'loaded-first',
      remotes: {
        remote1: 'remote1@http://localhost:2001/mf-manifest.json',
      },
      shared: ['react', 'react-dom', 'antd'],
    }),
  ],
});

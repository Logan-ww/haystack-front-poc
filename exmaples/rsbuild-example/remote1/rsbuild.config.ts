
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import path from 'path';

export default defineConfig({
  output: {
    injectStyles: true,
  },
  source: {
    // Prevent pnpm workspace from causing dev dependencies on npm to take effect
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },
  server: {
    port: 2001,
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production environment, you need to configure output.assetPrefix
    assetPrefix: 'http://localhost:2001',
  },
  tools: {
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'remote1',
      exposes: {
        './export-app': './src/export-App.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
});

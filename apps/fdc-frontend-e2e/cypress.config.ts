import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run fdc-frontend:serve',
        production: 'nx run fdc-frontend:preview',
      },
      ciWebServerCommand: 'nx run fdc-frontend:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});

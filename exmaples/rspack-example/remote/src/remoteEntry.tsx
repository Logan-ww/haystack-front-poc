import App from './app/app';
import { createBridgeComponent } from '@module-federation/bridge-react';

export const provider = createBridgeComponent({
  rootComponent: App,
});

export default createBridgeComponent({
  rootComponent: App,
});

# HaystackFrontendPoc

the module federation investigation based on the latest nx [article](https://nx.dev/concepts/module-federation/faster-builds-with-module-federation), with Rspack as build tool, need the Nodejs 20.18.0, pnpm 9. you may also
need to install the nx globally to run the nx commands

# Useful links
[react dom router v5, not working well](https://github.com/StephenGrider/mfe/tree/master) because of the 
[react dom router v6](https://github.com/nebarf/module-federation-react-router-dom)


[with all browserHistory applicaiton](https://blog.stackademic.com/from-monolith-to-micro-frontends-a-react-developers-complete-guide-904e490fb088)
[its repo](https://github.com/Priyammondal/e-commerce-micro-frontend-react-application/blob/main/README.md)


[module federation bridge](https://module-federation.io/practice/bridge/index.html)
[shell repo](https://github.com/module-federation/core/tree/main/apps/router-demo/router-host-2000)
[remote repo](https://github.com/module-federation/core/tree/main/apps/router-demo/router-remote2-2002)


# How to export the remote widget to shell
1. add new remote-entry*.ts file, export with default keyword
```
remote-entry2.ts

export {default} from './app/app';
```
2.add new configuration in module-federation.config.ts in remote app
```
exposes: {
    './Module': './src/remote-entry.ts',
    './ModuleCopy': './src/remote-entry2.ts',
  },
```
3.put the new remote module into the tsconfig.base.jon file in shell app
```
"paths": {
      "about/Module": ["apps/about/src/remote-entry.ts"],
      "cart/Module": ["apps/cart/src/remote-entry.ts"],
      "shop/Module": ["apps/shop/src/remote-entry.ts"],
      "shop/ModuleCopy": ["apps/shop/src/remote-entry2.ts"]
    }
```
4.use it in the shell app component
```
const ShopCopy = React.lazy(() => import('shop/ModuleCopy'));


<Route path="/shopcopy" element={<ShopCopy />} />
```
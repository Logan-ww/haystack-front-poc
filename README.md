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


# How to export the remote application with nested routers to shell
### First Approach (Event Bus)
1. remote app needs to choose MemoryRouter Like createMemoryRouter from react-router-dom if running remote app as sub router,
choose BrowserRouter when it comes to development, so the setup will be different depend on which scenario is using.
~~~
router-factory.ts

import { createBrowserRouter, createMemoryRouter } from "react-router-dom";
import { routes } from "./routes";
import { RoutingStrategy } from "./types";

interface CreateRouterProps {
  strategy?: RoutingStrategy;
  initialPathname?: string;
}

export function createRouter({ strategy, initialPathname }: CreateRouterProps) {
  if (strategy === 'browser') {
    return createBrowserRouter(routes);
  }

  const initialEntries = [initialPathname || "/"];
  return createMemoryRouter(routes, { initialEntries: initialEntries });
}
~~~
2. user may navigate from one remote app to the other remote app via different nested routers setup by each app, since only
host router is BrowserRouter, there will be no changes in the URL showing in the address because sub application use Memory 
Routers, so it needs notify URL has changed when user visit pages from host to remote , or remote to host, in remote app,
needs to set up the event listen like as below.
~~~
NavigationManager.tsx

import React, { ReactElement, useEffect } from "react";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";
import { routes } from "../routing/routes";

interface NavigationManagerProps {
  children: ReactElement;
}

export function NavigationManager({ children }: NavigationManagerProps) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function shellNavigationHandler(event: Event) {
      const pathname = (event as CustomEvent<string>).detail;
      if (location.pathname === pathname || !matchRoutes(routes, { pathname })) {
        return;
      }
      navigate(pathname);
    }

    window.addEventListener("[shell] navigated", shellNavigationHandler);

    return () => {
      window.removeEventListener("[shell] navigated", shellNavigationHandler);
    };
  }, [location]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("[app1] navigated", { detail: location.pathname })
    );
  }, [location]);

  return children;
}

~~~

3.then wrap the navigation manager into routes
~~~
routes.tsx

import React from 'react';
import { Outlet } from "react-router-dom";
import { NavigationManager } from "../components/NavigationManager";
import { Page1 } from "../pages/Page1";
import { Page2 } from "../pages/Page2";

export const routes = [
  {
    path: "/",
    element: (
      <NavigationManager>
        <Outlet />
      </NavigationManager>
    ),
    children: [
      {
        index: true,
        element: <Page1 />,
      },
      {
        path: "page-1",
        element: <Page1 />,
      },
      {
        path: "page-2",
        element: <Page2 />,
      },
    ],
  },
];
~~~

4. change bootstrap.tsx to set up for exporting the app based on browser and memory route.
~~~
import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { createRouter } from "./routing/router-factory";
import { RoutingStrategy } from "./routing/types";

const mount = ({
  mountPoint,
  initialPathname,
  routingStrategy,
}: {
  mountPoint: HTMLElement;
  initialPathname?: string;
  routingStrategy?: RoutingStrategy;
}) => {
  const router = createRouter({ strategy: routingStrategy, initialPathname });
  const root = createRoot(mountPoint);
  root.render(<RouterProvider router={router} />);

  return () => queueMicrotask(() => root.unmount());
};

export { mount };
~~~


5. change main.ts to set up for local development by using browser router
~~~
main.ts 

import('./bootstrap').then(
    ({ mount }) => {
      const localRoot = document.getElementById('app2-local');
  
      mount({
        mountPoint: localRoot!,
        routingStrategy: 'browser',
      });
    }
  );
  
  export {};
~~~

6. export the memory option to the host in remote-entry.ts
~~~
remote-entry.ts 

import { mount } from './bootstrap';
export default mount;
~~~

7. in host appliation, we may define the type of module imported from remote app in remote.d.ts
~~~
remote.d.ts

declare module 'cart/Module';
~~~

8. define a component to load the remote app and also need to listen to the router changes by using the event listener
~~~
App1.tsx

import React, { useEffect, useRef } from "react";
import mount from "cart/Module";
import { app1RoutingPrefix } from "../constants";
import { useLocation, useNavigate } from "react-router-dom";

const app1Basename = `/${app1RoutingPrefix}`;

export default () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Listen to navigation events dispatched inside app1 mfe.
  useEffect(() => {
    const app1NavigationEventHandler = (event: Event) => {
      const pathname = (event as CustomEvent<string>).detail;
      const newPathname = `${app1Basename}${pathname}`;
      if (newPathname === location.pathname) {
        return;
      }
      navigate(newPathname);
    };
    window.addEventListener("[app1] navigated", app1NavigationEventHandler);

    return () => {
      window.removeEventListener(
        "[app1] navigated",
        app1NavigationEventHandler
      );
    };
  }, [location]);

  // Listen for shell location changes and dispatch a notification.
  useEffect(
    () => {
      if (location.pathname.startsWith(app1Basename)) {
        window.dispatchEvent(
          new CustomEvent("[shell] navigated", {
            detail: location.pathname.replace(app1Basename, ""),
          })
        );
      }
    },
    [location],
  );

  const isFirstRunRef = useRef(true);
  const unmountRef = useRef(() => {});
  // Mount app1 MFE
  useEffect(
    () => {
      if (!isFirstRunRef.current) {
        return;
      }
      unmountRef.current = mount({
        mountPoint: wrapperRef.current!,
        initialPathname: location.pathname.replace(
          app1Basename,
          ''
        ),
      });
      isFirstRunRef.current = false;
    },
    [location],
  );

  useEffect(() => unmountRef.current, []);

  return <div ref={wrapperRef} id="app1-mfe" />;
};

~~~

9. define routes in host app
~~~
routes.tsx

import React, { lazy, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { Layout } from "../components/Layout";
import { app1RoutingPrefix, app2RoutingPrefix } from "./constants";

const App1Lazy = lazy(() => import("../components/App1"));
// const App2Lazy = lazy(() => import("../components/App2"));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to={`/${app1RoutingPrefix}`} />,
      },
      {
        path: `/${app1RoutingPrefix}/*`,
        element: <Suspense fallback="Loading App1..."><App1Lazy /></Suspense>,
      },
      // {
      //   path: `/${app2RoutingPrefix}/*`,
      //   element: <Suspense fallback="Loading App2..."><App2Lazy /></Suspense>,
      // },
    ],
  }
];
~~~

10. initialize the routes in host app by using the Browser router
~~~
Router.tsx

import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { routes } from "./routes";

const browserRouter = createBrowserRouter(routes);

export function Router() {
  return (
    <RouterProvider router={browserRouter} />
  );
}

~~~
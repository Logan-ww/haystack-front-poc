export { default } from './app/app';
// import {createRoot} from 'react-dom/client';
// import { } from "react-router"
// import { createMemoryHistory, createBrowserHistory, BrowserHistory, MemoryHistory, Listener } from 'history';

// interface applicationProps {
//     onNavigate?: Listener
//     defaultHistory: BrowserHistory,
//     initialPath: string
// }

// // Mount function to start up the app
// const mount = (el: Element, { onNavigate, defaultHistory, initialPath }: applicationProps): Object => {
//     const history =
//         defaultHistory ||
//         createMemoryHistory({
//             initialEntries: [initialPath],
//         });

//     if (onNavigate) {
//         history.listen(onNavigate);
//     }
//     const root = createRoot(el);

//     // root.render(<App/>);
//     root.render(<default />);

//     return {
//         onParentNavigate({ pathname: nextPathname }: Location) {
//             const { pathname } = history.location;

//             if (pathname !== nextPathname) {
//                 history.push(nextPathname);
//             }
//         },
//     };
// };

// // If we are in development and in isolation,
// // call mount immediately
// if (process.env.NODE_ENV === 'development') {
//     const devRoot = document.querySelector('#_marketing-dev-root');

//     if (devRoot) {
//         mount(devRoot, { defaultHistory: createBrowserHistory(), initialPath: ''});
//     }
// }

// // We are running through container
// // and we should export the mount function
// export { mount };

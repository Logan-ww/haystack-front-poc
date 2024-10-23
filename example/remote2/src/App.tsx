import { Image } from 'antd';
import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createHashRouter,
  createMemoryRouter,
} from 'react-router-dom';

import './App.css';
import Style from './App.css.json';

function Home() {

  return (
    <div className={Style.content}>
      <h1 >Remote2 home page</h1>
      <div>hello sub home page</div>
      <div>React router v6 + React 18</div>
    </div>
  );
}

// import styles from './App.module.css';
// function Home() {

//   return (
//     <div className={styles.content}>
//       <h1 >Remote2 home page</h1>
//       <div>hello sub home page</div>
//       <div>React router v6 + React 18</div>
//     </div>
//   );
// }

function Detail() {
  return (
    <>
      <h2>Remote2 detail page</h2>
      <div>hello sub2 detail page</div>
      <Image
        width={200}
        src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
      />
    </>
  );
}

function Layout() {
  return (
    <>
      <ul>
        <li>
          <Link to="/" className="self-remote2-home-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/detail" className="self-remote2-detail-link">
            Detail
          </Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/detail',
        element: <Detail />,
      },
    ],
  },
]);

const App = (info?: { basename?: string; initialEntries?: Array<string>, containerApp?: ShadowRoot }) => {
  const container = info?.containerApp ?? info?.containerApp;
  return (
    <RouterProvider router={router} />
  );
};
export default App;
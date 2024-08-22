import * as React from 'react';

import NxWelcome from './nx-welcome';

import { Link, Route, Routes } from 'react-router-dom';

const RemoteContentPages = React.lazy(
  () => import('remote-content-pages/Module')
);

const RemoteHome = React.lazy(() => import('remote-home/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/remote-content-pages">RemoteContentPages</Link>
        </li>
        <li>
          <Link to="/remote-home">RemoteHome</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="host-react" />} />
        <Route path="/remote-content-pages" element={<RemoteContentPages />} />
        <Route path="/remote-home" element={<RemoteHome />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;

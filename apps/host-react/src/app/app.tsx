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
      <ul
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#EEEEEE',
          padding: '1rem',
          listStyleType: 'none',
        }}
      >
        <li>
          <Link to="/">Host/Shell</Link>
        </li>
        <li>
          <Link to="/remote-home">Home Page</Link>
        </li>
        <li>
          <Link to="/remote-content-pages">Content Page</Link>
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

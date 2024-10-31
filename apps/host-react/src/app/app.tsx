import * as React from 'react';

import NxWelcome from './nx-welcome';

import { Link, Route, Routes } from 'react-router-dom';
import { emitter } from '@fdc-frontend/event-bus';
import { Settings } from 'apps/remote-content-pages/src/app/hooks/useSettings';
import {
  appSettingsVar,
  Book,
  login,
  logout,
  userVar,
} from '@fdc-frontend/state';
import { useReactiveVar } from '@apollo/client';
import { StateWrapper } from '@fdc-frontend/ui';

const RemoteContentPages = React.lazy(
  () => import('remote-content-pages/Module')
);

const RemoteHome = React.lazy(() => import('remote-home/Module'));

export function App() {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [settings, setSettings] = React.useState<Settings>();

  const appSettings = useReactiveVar(appSettingsVar);

  const user = useReactiveVar(userVar);

  React.useEffect(() => {
    emitter.on('REMOTE_HOME_GET_BOOKS', (books) => {
      setBooks(books);
    });

    return () => emitter.off('REMOTE_HOME_GET_BOOKS');
  }, []);

  React.useEffect(() => {
    emitter.on('REMOTE_CONTENT_SETTINGS', (settings) => {
      setSettings(settings);
    });

    return () => emitter.off('REMOTE_CONTENT_SETTINGS');
  }, []);

  return (
    <React.Suspense fallback={null}>
      {appSettings.displayNavigation && (
        <ul
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#EEEEEE',
            padding: '1rem',
            listStyleType: 'none',
          }}
        >
          {!user && <button onClick={() => login()}> Login</button>}
          {user && (
            <li>
              <p>
                <StateWrapper state="Shared">
                  <b>User: </b> {user?.name}
                  <button onClick={() => logout()}> Logout</button>
                </StateWrapper>
              </p>
            </li>
          )}
          {settings?.displayBook && (
            <li>
              <StateWrapper state="Home">
                <p>
                  <b>Book {books.length}: </b>{' '}
                  {books?.[books.length - 1]?.title}
                </p>
              </StateWrapper>
            </li>
          )}
          <li>
            <Link to="/">Host/Shell</Link>
          </li>
          <li>
            <Link to="/remote-home">Home Page</Link>
          </li>
          <li>
            <Link to="/remote-content-pages/test">Content Page</Link>
          </li>
        </ul>
      )}
      <Routes>
        <Route path="/" element={<NxWelcome title="Shell Application" />} />
        <Route
          path="/remote-content-pages/*"
          element={<RemoteContentPages />}
        />
        <Route path="/remote-home" element={<RemoteHome />} />
      </Routes>

      <div
        style={{
          marginTop: 30,
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
      >
        <h2>State color reference</h2>
        <p>
          <StateWrapper state="Shared">Shared</StateWrapper>
        </p>
        <p>
          <StateWrapper state="Home">Home</StateWrapper>
        </p>
        <p>
          <StateWrapper state="Content">Content</StateWrapper>
        </p>
      </div>
    </React.Suspense>
  );
}

export default App;

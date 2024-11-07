// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { Settings } from './components/Settings';
import { Helmet } from 'react-helmet-async';

import NxWelcome from './nx-welcome';

export function App() {
  return (
    <div>
      <Helmet>
        <title>Content Page</title>
        <link rel="canonical" href="https://www.otherstuff.com/" />
      </Helmet>
      <NxWelcome title="Content Page" />
      <Settings />
    </div>
  );
}

export default App;

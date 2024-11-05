// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { Settings } from './components/Settings';

import NxWelcome from './nx-welcome';
import {Helmet} from "react-helmet";

export function App() {
  return (
    <div>
      <Helmet>
          <meta charSet="utf-8" />
          <title>remote content page title</title>
          <meta name="description" content="content description" />
          <meta name="keywords" content="remote, content, react" />
          <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <NxWelcome title="Content Page" />
      <Settings />
    </div>
  );
}

export default App;

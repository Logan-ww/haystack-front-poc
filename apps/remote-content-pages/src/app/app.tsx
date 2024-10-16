// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { Settings } from './components/Settings';

import NxWelcome from './nx-welcome';

export function App() {
  return (
    <div>
      <NxWelcome title="Content Page" />
      <Settings />
    </div>
  );
}

export default App;

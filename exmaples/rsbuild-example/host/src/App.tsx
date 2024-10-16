import { Route, Routes } from 'react-router-dom';
import { createRemoteComponent } from '@module-federation/bridge-react';
import Navigation from './navigation';
import Home from './pages/Home';

const FallbackErrorComp = (info: any) => {
  return (
    <div>
      <h2>This is ErrorBoundary Component</h2>
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{info?.error.message}</pre>
      <button onClick={() => info.resetErrorBoundary()}>
        resetErrorBoundary(try again)
      </button>
    </div>
  );
};

const FallbackComp = <div data-test-id="loading">loading...</div>;

const Remote1App = createRemoteComponent({
  loader: () => import('remote1/export-app'),
  export: 'provider',
  fallback: FallbackErrorComp,
  loading: FallbackComp,
});

const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" Component={Home} />
        <Route
          path="/remote1/*"
          Component={() => <Remote1App />}
        />
      </Routes>
    </div>
  );
};

export default App;

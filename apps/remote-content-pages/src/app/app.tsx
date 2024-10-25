// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useInRouterContext,
} from 'react-router-dom';
import { Settings } from './components/Settings';

import NxWelcome from './nx-welcome';

export function App() {
  const isInRouterContext = useInRouterContext();
  if (!isInRouterContext) {
    return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    );
  }

  return <AppRoutes />;
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Empty />} />
      <Route path="test" element={<Test />}>
        <Route path="test-empty" element={<Empty />} />
      </Route>
      <Route path="test1" element={<Empty />} />
    </Routes>
  );
};

const Empty = () => {
  return <div>Empty</div>;
};

const Test = () => {
  const navigate = useNavigate();
  return (
    <div>
      <NxWelcome title="Content Page" />
      <Settings />
      <Outlet />
      <br />
      <button onClick={() => navigate('/')}>Go home</button>
    </div>
  );
};

export default App;

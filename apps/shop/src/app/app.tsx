// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
// import { createMemoryHistory, createBrowserHistory, BrowserHistory, MemoryHistory, Listener } from 'history';
// import { Route, Router, MemoryRouter } from 'react-router-dom';

import NxWelcome from './nx-welcome';

// interface AppProps {
//   history: BrowserHistory | MemoryHistory
// }

export function App() {
  return (
    <div>
      <NxWelcome title="shop" />
    </div>
  );
}

// export function App ({history}: AppProps) {
//   return (
//     <div>
//        {/* <Router basename='shop' navigator={history} location={''}> */}
//             {/* <Route  path="/pricing" element={<Pricing></Pricing>} />
//             <Route path="/" element={<Landing/>} /> */}
//         {/* </Router>  */}
//     </div>
//   );
// }

// export const Pricing = () => {

//     return (<>Pricing</>)
// }

// export const Landing = () => {

//   return (<>Pricing</>)
// }

export default App;

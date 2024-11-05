import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {Helmet} from "react-helmet";

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Host container title</title>
          <meta name="description" content="host description" />
          <meta name="keywords" content="host, container, react" />
          <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    <App />
  </BrowserRouter>
);

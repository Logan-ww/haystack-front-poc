import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ReactShadow, { useShadowRoot } from 'react-shadow';

const rootEl = document.getElementById('root');
if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(
        <React.StrictMode>
            <App basename={'/remote2'} containerApp={undefined} />
        </React.StrictMode>,
    );
}

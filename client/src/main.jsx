import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>

      <Provider store={store}>
        <App />
      </Provider>
      
    </BrowserRouter>
  </React.StrictMode>
);

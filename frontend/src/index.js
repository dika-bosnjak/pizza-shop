import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { getTotal } from './features/basket/basketSlice';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
// store.dispatch(getTotal())
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);



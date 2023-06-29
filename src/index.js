import React from 'react';
import { inject } from '@vercel/analytics';
import { Provider } from 'react-redux';
import { createRoot } from "react-dom/client";
import App from "./App";

import { configureAppStore } from './store/configureStore';

const store = configureAppStore();
inject();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Provider store={store}>
    
    <App />
  
    </Provider>
  </React.StrictMode>
);

//const el = document.getElementById('app');
//const root = createRoot(el);
//root.render(
//    <App />
//);
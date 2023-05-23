import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from "react-dom/client";
import App from "./App";

import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

//import { configureAppStore } from './store/configureStore';

//const store = configureAppStore();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
    <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);

//const el = document.getElementById('app');
//const root = createRoot(el);
//root.render(
//    <App />
//);
import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import App from './App';
import {Provider} from 'react-redux';
import store from './store/store'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      {/* HashRouter로 라우터 인식못하는 오류 잡음(url에 #이 들어가므로 차우 다른 방법 모색해야함) */}
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import './styles/global.css';

// страницы разбить по папкам
// создать css переменные для цветов, типографии
// добавить eslint + prettier
// добавить husky + lint-staged (опционально)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

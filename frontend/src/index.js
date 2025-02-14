import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'moment/locale/ru';
import moment from 'moment';
moment.locale('ru');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

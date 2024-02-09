import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.scss';

// IMPORT store REDUX/STORE WE EXPORTED
import store from './redux/store.js';

// IMPORT PROVIDER FROM REDUX
import { Provider } from 'react-redux';


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>

        {/* ASSIGN THE REDUX STORE TO THE PROVIDER */}
        {/* NOW OUR APP CAN CONSUME THE VALUES PROVIDED FROM PROVIDER */}
        <Provider store={store}>

            <App />

        </Provider>

    </React.StrictMode>,
)

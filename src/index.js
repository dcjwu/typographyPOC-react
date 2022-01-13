import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store";
import App from './App';

import 'bootstrap/dist/css/bootstrap.css'
import './assets/styles/main.scss'

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

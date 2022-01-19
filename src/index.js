import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {HashRouter} from 'react-router-dom'
import App from './App'
import './assets/styles/main.scss'
import store from './redux/store'

ReactDOM.render(
   <React.StrictMode>
      <HashRouter>
         <Provider store={store}>
            <App/>
         </Provider>
      </HashRouter>
   </React.StrictMode>,
   document.getElementById('root')
)

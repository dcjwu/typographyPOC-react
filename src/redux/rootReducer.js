import {combineReducers} from 'redux'
import authReducer from './auth/auth.reducer'
import productsReducer from './products/products.reducer'

export default combineReducers({
   auth: authReducer,
   products: productsReducer
})
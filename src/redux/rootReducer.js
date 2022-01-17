import {combineReducers} from 'redux'
import authReducer from './auth/auth.reducer'
import cartReducer from './cart/cart.reducer'
import productsReducer from './products/products.reducer'

export default combineReducers({
   auth: authReducer,
   products: productsReducer,
   cart: cartReducer
})
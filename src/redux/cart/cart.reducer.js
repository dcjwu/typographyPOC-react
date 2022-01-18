import cartTypes from './cart.types'

const initialState = {
   cartProducts: [],
   totalPrice: 0
}

const cartReducer = (state = initialState, action) => {
   switch (action.type) {
      case cartTypes.SET_PRODUCT_TO_CART:
         return {
            ...state,
            cartProducts: [...state.cartProducts, action.payload],
            totalPrice: state.totalPrice += action.payload.price
         }
      case cartTypes.REMOVE_PRODUCT_FROM_CART:
         const currentProductPrice = state.cartProducts.find(item => item.id === action.payload).price
         return {
            ...state,
            cartProducts: state.cartProducts.filter(item => item.id !== action.payload),
            totalPrice: state.totalPrice - currentProductPrice
         }
      default:
         return state
   }
}

export default cartReducer
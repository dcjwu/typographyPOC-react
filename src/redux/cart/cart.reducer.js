import cartTypes from './cart.types'

const initialState = {
   cartProducts: [],
   totalPrice: 0
}

const getTotalPrice = arr => arr.reduce((accumulator, current) => accumulator + current.price, 0)

const cartReducer = (state = initialState, action) => {
   switch (action.type) {
      case cartTypes.SET_PRODUCT_TO_CART:
         const currentProductPrice = !state.cartProducts
            ? action.payload.price
            : getTotalPrice(state.cartProducts)
         return {
            ...state,
            cartProducts: [...state.cartProducts, action.payload],
            totalPrice: currentProductPrice
         }
      // case cartTypes.SET_TOTAL_PRICE:
      //    return {
      //       ...state,
      //       totalPrice: getTotalPrice(state.cartProducts)
      //    }
      default:
         return state
   }
}

export default cartReducer
import productsTypes from "./products.types"

const initialState = {
   productList: null,
   productsByCategory: null,
   productById: {},
   isLoaded: false
}

const productsReducer = (state = initialState, action) => {
   switch (action.type) {
   case productsTypes.SET_PRODUCTS:
      return {
         ...state,
         productList: action.payload,
         productsByCategory: null,
         isLoaded: true
      }
   case productsTypes.SET_PRODUCTS_BY_CATEGORY:
      return {
         ...state,
         productsByCategory: action.payload,
         isLoaded: true
      }
   case productsTypes.SET_PRODUCT_BY_ID:
      return {
         ...state,
         productById: action.payload,
         isLoaded: true
      }
   case productsTypes.CLEAR_PRODUCT_BY_ID:
      return {
         ...state,
         productById: {}
      }
   case productsTypes.SET_LOADED:
      return {
         ...state,
         isLoaded: action.payload
      }
   default:
      return state
   }
}

export default productsReducer
import orderTypes from './order.types'

const initialState = {
   currentOrder: [],
   orderListFromDb: [],
   isDataLoaded: false
}

const orderReducer = (state = initialState, action) => {
   switch (action.type) {
      case orderTypes.CREATE_ORDER:
         return {
            ...state,
            currentOrder: action.payload
         }
      case orderTypes.GET_ORDERS:
         return {
            ...state,
            orderListFromDb: action.payload,
            isDataLoaded: true
         }
      case orderTypes.CLEAR_ORDER:
         return {
            ...state,
            currentOrder: []
         }
      case orderTypes.SET_DATA_LOADED:
         return {
            ...state,
            isDataLoaded: action.payload
         }
      default:
         return state
   }
}

export default orderReducer
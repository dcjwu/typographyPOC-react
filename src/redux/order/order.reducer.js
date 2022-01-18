import orderTypes from './order.types'

const initialState = {
   currentOrder: [],
   orderListFromDb: []
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
            orderListFromDb: action.payload
         }
      default:
         return state
   }
}

export default orderReducer
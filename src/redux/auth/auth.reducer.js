import authTypes from './auth.types'

const initialState = {
   showSuccessMessage: false,
   currentUser: false,
   isAdmin: false,
   authError: '',
   isUserAuthLoaded: false
}

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case authTypes.SHOW_LOGIN_MESSAGE_SUCCESS:
         return {
            ...state,
            showSuccessMessage: action.payload,
            authError: ''
         }
      case authTypes.CURRENT_USER:
         return {
            ...state,
            currentUser: action.payload,
            authError: '',
            isUserAuthLoaded: true
         }
      case authTypes.IS_USER_ADMIN:
         return {
            ...state,
            isAdmin: action.payload
         }
      case authTypes.SET_USER_LOGOUT:
         return {
            ...state,
            showSuccessMessage: false,
            currentUser: false,
            isAdmin: false,
            authError: '',
            isUserAuthLoaded: false
         }
      case authTypes.SET_AUTH_ERROR:
         return {
            ...state,
            showSuccessMessage: false,
            authError: action.payload,
            isUserAuthLoaded: false
         }
      case authTypes.SET_USER_AUTH_LOADED:
         return {
            ...state,
            isUserAuthLoaded: action.payload
         }
      default:
         return state
   }
}

export default authReducer
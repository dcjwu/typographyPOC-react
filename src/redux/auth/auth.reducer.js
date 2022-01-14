import authTypes from './auth.types'

const initialState = {
   showSuccessMessage: false,
   currentUser: false,
   isAdmin: false,
   setAuthError: '',
   isUserAuthLoaded: false
}

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case authTypes.SHOW_LOGIN_MESSAGE_SUCCESS:
         return {
            ...state,
            showSuccessMessage: action.payload,
            setAuthError: ''
         }
      case authTypes.CURRENT_USER:
         return {
            ...state,
            currentUser: action.payload,
            setAuthError: '',
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
            setAuthError: '',
            isUserAuthLoaded: false
         }
      case authTypes.SET_AUTH_ERROR:
         return {
            ...state,
            showSuccessMessage: false,
            setAuthError: action.payload,
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
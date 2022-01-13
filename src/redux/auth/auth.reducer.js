import authTypes from "./auth.types";

const initialState = {
    isAuth: false,
    showSuccessMessage: false,
    currentUser: null,
    isAdmin: false,
    setAuthError: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authTypes.SHOW_LOGIN_MESSAGE_SUCCESS:
            return {
                ...state,
                showSuccessMessage: action.payload,
                setAuthError: ''
            }
        case authTypes.IS_USER_AUTH_SUCCESS:
            return {
                ...state,
                isAuth: action.payload,
                setAuthError: ''
            }
        case authTypes.CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
                setAuthError: ''
            }
        case authTypes.IS_USER_ADMIN:
            return {
                ...state,
                isAdmin: action.payload,
            }
        case authTypes.SET_USER_LOGOUT:
            return {
                ...state,
                isAuth: false,
                showSuccessMessage: false,
                currentUser: null,
                isAdmin: false,
                setAuthError: ''
            }
        case authTypes.SET_AUTH_ERROR:
            return {
                ...state,
                showSuccessMessage: false,
                setAuthError: action.payload
            }
        default:
            return state
    }
}

export default authReducer
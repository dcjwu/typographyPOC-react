import authTypes from './auth.types'
import firebase from 'firebase/compat/app'
import {auth, firestore} from '../../firebase/utils'

export const userAuth = (email, password) => async dispatch => {
   dispatch(setIsUserAuthLoaded(true))
   await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
         auth.signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
               dispatch(setLoginSuccessMessage(true))
               const {uid} = userCredentials.user
               firestore.doc(`users/${uid}`)
                  .get()
                  .then(snap => {
                     setTimeout(() => {
                        dispatch(setLoginSuccessMessage(false))
                     }, 2000)
                     if (!snap.data().userRoles.includes('admin')) return
                     dispatch(setUserAdmin(true))
                  })
            })
            .catch(error => {
               dispatch(setAuthError(error.code))
            })
      })
}

export const setLoginSuccessMessage = successFlag => ({
   type: authTypes.SHOW_LOGIN_MESSAGE_SUCCESS,
   payload: successFlag
})

export const checkCurrentUser = () => async dispatch => {
   await auth.onAuthStateChanged(user => {
      if (user) {
         dispatch(setCurrentUser(user.email))
         firestore.doc(`users/${user.uid}`)
            .get()
            .then(snap => {
               if (!snap.data().userRoles.includes('admin')) return
               dispatch(setUserAdmin(true))
            })
      }
   })
}

const setCurrentUser = email => ({
   type: authTypes.CURRENT_USER,
   payload: email
})

export const userLogout = () => async dispatch => {
   await auth.signOut()
      .then(dispatch(setUserLogout()))
}

const setUserLogout = () => ({
   type: authTypes.SET_USER_LOGOUT
})

const setUserAdmin = isAdmin => ({
   type: authTypes.IS_USER_ADMIN,
   payload: isAdmin
})

export const setAuthError = error => ({
   type: authTypes.SET_AUTH_ERROR,
   payload: error
})

const setIsUserAuthLoaded = isLoaded => ({
   type: authTypes.SET_USER_AUTH_LOADED,
   payload: isLoaded
})

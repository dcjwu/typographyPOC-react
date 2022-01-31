import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

import Button from "../components/_UI/Button"
import Input from "../components/_UI/Input"
import Spinner from "../components/_UI/Spinner"
import { userAuth } from "../redux/auth/auth.actions"

const Login = () => {
   const dispatch = useDispatch()
   const history = useHistory()
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")

   const {
      authError,
      currentUser,
      isUserAuthLoaded
   } = useSelector(({ auth }) => auth)

   const onInputEmail = e => setEmail(e.target.value)
   const onInputPassword = e => setPassword(e.target.value)

   const resetForm = () => {
      setEmail("")
      setPassword("")
   }

   useEffect(() => {
      if (currentUser) {
         history.push("/")
      }
   }, [currentUser])

   const handleFormSubmit = async e => {
      e.preventDefault()
      dispatch(userAuth(email, password))
      resetForm()
   }

   return (
      <>
         {
            !isUserAuthLoaded
               ? <div className="container-content">
                  <div className="login-text">
                     <div className="d-flex align-items-center justify-content-center gap-5 p-4 credentials">
                        <small>
                           <b>ADMIN</b>
                           <p>email: a@d.min</p>
                           <p>password: admin0</p>
                        </small>
                        <small>
                           <b>USER</b>
                           <p>email: u@s.er</p>
                           <p>password: user00</p>
                        </small>
                     </div>
                  </div>
                  {
                     authError &&
                     <h5 className="mt-3 text-center notification-red">{authError}</h5>
                  }
                  <form className="mt-3 form-custom" onSubmit={handleFormSubmit}>
                     <div className="form-group mb-5">
                        <span>Email</span>
                        <Input placeholder="Email address..." type="email"
                               value={email}
                               onUpdateValue={onInputEmail}/>
                     </div>
                     <div className="form-group mb-5">
                        <span>Password</span>
                        <Input placeholder="Password..." type="password"
                               value={password}
                               onUpdateValue={onInputPassword}/>
                     </div>
                     <Button type="submit">Sign In</Button>
                  </form>
               </div>
               : <Spinner/>
         }
      </>
   )
}

export default Login
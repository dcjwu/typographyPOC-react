import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Input from '../components/_UI/Input'
import Button from '../components/_UI/Button'
import Spinner from '../components/_UI/Spinner'
import {setAuthError, userAuth} from '../redux/auth/auth.actions'

const Login = () => {
   const dispatch = useDispatch()
   const history = useHistory()
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const {authError, currentUser, isUserAuthLoaded} = useSelector(({auth}) => auth)

   const onInputEmail = e => setEmail(e.target.value)
   const onInputPassword = e => setPassword(e.target.value)

   const resetForm = () => {
      setEmail('')
      setPassword('')
   }

   useEffect(() => {
      if (currentUser) {
         history.push('/')
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
                     <div className="d-flex align-items-center justify-content-center gap-5 alert-info p-4">
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
                     authError && <h5 className="mt-3 text-center text-danger">{authError}</h5>
                  }
                  <form className="mt-3 form-custom" onSubmit={handleFormSubmit}>
                     <div className="form-group mb-5">
                        <Input type="email" placeholder="Email address..." value={email}
                               onUpdateValue={onInputEmail}/>
                     </div>
                     <div className="form-group mb-5">
                        <Input type="password" placeholder="Password..." value={password}
                               onUpdateValue={onInputPassword}/>
                     </div>
                     <Button type="submit">Submit</Button>
                  </form>
               </div>
               : <Spinner/>
         }
      </>
   )
}

export default Login
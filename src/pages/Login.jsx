import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userAuth} from "../redux/auth/auth.actions";
import Input from "../components/_UI/Input";
import Button from "../components/_UI/Button";
import Spinner from "../components/_UI/Spinner";

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {setAuthError, currentUser, isUserAuthLoaded} = useSelector(({auth}) => auth)

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
                    ? <div className='container-content'>
                        {
                            setAuthError && <h5 className='mt-5 text-center text-danger'>{setAuthError}</h5>
                        }
                        <form className='mt-5 form-custom' onSubmit={handleFormSubmit}>
                            <div className="form-group mb-5">
                                <Input type='email' placeholder='Email address...' value={email}
                                       onUpdateValue={onInputEmail}/>
                            </div>
                            <div className="form-group mb-5">
                                <Input type='password' placeholder='Password...' value={password}
                                       onUpdateValue={onInputPassword}/>
                            </div>
                            <Button type='submit'>Submit</Button>
                        </form>
                    </div>
                    : <Spinner/>
            }
        </>
    )
}

export default Login
import {useEffect} from "react";
import {Route, Switch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Menu from "./components/Menu/Menu";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import Admin from "./pages/Admin";
import PublicRoute from "./components/_routes/PublicRoute";
import {checkCurrentUser} from "./redux/auth/auth.actions";
import AdminRoute from "./components/_routes/AdminRoute";

const App = () => {
    const dispatch = useDispatch()
    const {currentUser, isAdmin} = useSelector(({auth}) => auth)

    useEffect(() => {
        dispatch(checkCurrentUser())
    }, [])

    return (
        <>
            <Menu/>
            <div className="main">
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <PublicRoute exact path='/login' component={Login} auth={currentUser}/>
                    <Route exact path='/shop' component={Shop}/>
                    <Route path='/shop/:category/:id' component={ProductPage}/>
                    <Route exact path='/cart' component={Cart}/>
                    <AdminRoute exact path='/admin' component={Admin} auth={isAdmin}/>
                    <Route path='*' component={Home}/>
                </Switch>
            </div>
        </>
    )
}

export default App
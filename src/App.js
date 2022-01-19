import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Route, Switch} from 'react-router-dom'
import AdminRoute from './components/_routes/AdminRoute'
import PublicRoute from './components/_routes/PublicRoute'
import Menu from './components/Menu/Menu'
import Admin from './pages/Admin'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductCategory from './pages/ProductCategory'
import ProductPage from './pages/ProductPage'
import Shop from './pages/Shop'
import {checkCurrentUser} from './redux/auth/auth.actions'

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
               <Route exact path="/shop/:category/:id" component={ProductPage}/>
               <Route exact path="/shop/:category" component={ProductCategory}/>
               <PublicRoute exact path="/login" component={Login} auth={currentUser}/>
               <Route exact path="/shop" component={Shop}/>
               <Route exact path="/cart" component={Cart}/>
               <AdminRoute exact path="/admin" component={Admin} auth={isAdmin}/>
               <Route exact path="/" component={Home}/>
               <Route path="*" component={Home}/>
            </Switch>
         </div>
      </>
   )
}

export default App
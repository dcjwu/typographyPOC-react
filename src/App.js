import {useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Menu from './components/Menu/Menu'
import Home from './pages/Home'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Shop from './pages/Shop'
import ProductPage from './pages/ProductPage'
import ProductCategory from './pages/ProductCategory'
import Admin from './pages/Admin'
import PublicRoute from './components/_routes/PublicRoute'
import {checkCurrentUser} from './redux/auth/auth.actions'
import AdminRoute from './components/_routes/AdminRoute'

const App = () => {
   const dispatch = useDispatch()
   const {currentUser, isAdmin} = useSelector(({auth}) => auth)

   useEffect(() => {
      dispatch(checkCurrentUser())
   }, [])

   console.log('Simple github check.')

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
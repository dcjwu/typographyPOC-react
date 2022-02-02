import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { Route, Switch } from "react-router-dom"

import AdminRoute from "./components/_routes/AdminRoute"
import PublicRoute from "./components/_routes/PublicRoute"
import Menu from "./components/Menu/Menu"
import AdminOrders from "./pages/AdminOrders"
import AdminUsers from "./pages/AdminUsers"
import Cart from "./pages/Cart"
import Home from "./pages/Home"
import Login from "./pages/Login"
import ProductCategory from "./pages/ProductCategory"
import ProductPage from "./pages/ProductPage"
import Shop from "./pages/Shop"
import { checkCurrentUser } from "./redux/auth/auth.actions"

const App = () => {
   const dispatch = useDispatch()
   const {
      currentUser,
      isAdmin
   } = useSelector(({ auth }) => auth)

   useEffect(() => {
      dispatch(checkCurrentUser())
   }, [])

   return (
      <>
         <Menu/>
         <div className="main">
            <Switch>
               <Route exact component={ProductPage} path="/shop/:category/:id"/>
               <Route exact component={ProductCategory} path="/shop/:category"/>
               <AdminRoute exact auth={isAdmin} component={AdminOrders}
                           path="/admin/orders"/>
               <AdminRoute exact auth={isAdmin} component={AdminUsers}
                           path="/admin/users"/>
               <PublicRoute exact auth={currentUser} component={Login}
                            path="/login"/>
               <Route exact component={Shop} path="/shop"/>
               <Route exact component={Cart} path="/cart"/>
               <Route exact component={Home} path="/"/>
               <Route component={Home}/>
            </Switch>
         </div>
      </>
   )
}

export default App
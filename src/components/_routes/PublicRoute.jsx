import {Route, Redirect} from "react-router-dom";

const PublicRoute = ({component: Component, auth, ...otherProps}) => {
    return (
        <Route {...otherProps} render={(props) => (
            auth === null
                ? <Component {...props}/>
                : <Redirect to={'/'}/>
        )}>

        </Route>
    )
}

export default PublicRoute
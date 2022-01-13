import {Link} from "react-router-dom";
import logoPlaceholder from '../../../assets/images/logo-placeholder.svg'

const Logo = () => {
    return (
        <Link to='/'>
            <img src={logoPlaceholder} alt="Logo"/>
        </Link>
    )
}

export default Logo
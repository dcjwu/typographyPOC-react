import { Link } from "react-router-dom"

import logoPlaceholder from "../../../assets/images/logo-placeholder.svg"

const Logo = () => {
   return (
      <Link to="/">
         <img alt="Logo" src={logoPlaceholder}/>
      </Link>
   )
}

export default Logo
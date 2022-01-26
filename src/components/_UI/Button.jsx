import PropTypes from "prop-types"

import Input from "./Input"

const Button = ({
   children,
   type,
   additionalClass,
   ...otherProps
}) => {
   return (
      <button {...otherProps}
              className={`btn btn-outline-primary ${additionalClass}`}
              type={type}
      >
         {children}
      </button>
   )
}

Input.propTypes = {
   type: PropTypes.string,
   additionalClass: PropTypes.string
}

export default Button
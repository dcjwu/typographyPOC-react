import PropTypes from "prop-types"

import Input from "./Input"

const Button = ({
   children,
   type,
   additionalClass,
   ...otherProps
}) => {
   return (
      <div className="btn-wrapper">
         <button {...otherProps}
                 className={`btn btn-custom ${additionalClass ? ` ${additionalClass}` : ""}`}
                 type={type}
         >
            {children}
         </button>
      </div>
   )
}

Input.propTypes = {
   type: PropTypes.string,
   additionalClass: PropTypes.string
}

export default Button
import PropTypes from "prop-types";
import Input from "./Input";

const Button = ({children, type}) => {
    return (
        <button
            className='btn btn-outline-primary'
            type={type}
        >
            {children}
        </button>
    )
}

Input.propTypes = {
    type: PropTypes.string.isRequired
}

export default Button
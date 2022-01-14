import PropTypes from 'prop-types'

const Input = ({type, placeholder, value, onUpdateValue}) => {
   return (
      <input className="form-control me-2"
             type={type}
             placeholder={placeholder}
             value={value}
             onChange={onUpdateValue}>
      </input>
   )
}

Input.propTypes = {
   type: PropTypes.string.isRequired,
   placeholder: PropTypes.string.isRequired,
   value: PropTypes.string.isRequired,
   onUpdateValue: PropTypes.func.isRequired
}

export default Input
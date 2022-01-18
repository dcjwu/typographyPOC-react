import PropTypes from 'prop-types'

const Modal = ({children, top, isError}) => {
   return (
      <div className='modal-window d-flex flex-column justify-content-center' style={{top: top}}>
         {
            !isError
            ? <h1 className='alert-success p-5 w-100 text-center'>{children}</h1>
               : <h1 className='alert-danger p-5 w-100 text-center'>{children}</h1>
         }
      </div>
   )
}

Modal.propTypes = {
   children: PropTypes.string.isRequired,
   top: PropTypes.string.isRequired,
   isError: PropTypes.bool.isRequired
}

export default Modal
import PropTypes from "prop-types"

const Modal = ({
   children,
   top,
   isError,
   showModal,
   handleCloseModal
}) => {

   if (!showModal) return null
   else return (
      <div className="modal-window d-flex flex-column justify-content-center"
           style={{ top: top }}>
         {
            !isError
               ? <div className="alert-success w-100 text-center notification-green">
                  <h1>{children}</h1>
                  <p className="btn btn-modal success btn-outline-success mt-5 px-3 py-2" onClick={handleCloseModal}>CLOSE</p>
               </div>
               : <div className="alert-danger w-100 text-center notification-red">
                  <h1>{children}</h1>
                  <p className="btn btn-modal error btn-outline-danger mt-5 px-3 py-2" onClick={handleCloseModal}>CLOSE</p>
               </div>
         }
      </div>
   )
}

Modal.propTypes = {
   children: PropTypes.string.isRequired,
   top: PropTypes.string.isRequired,
   isError: PropTypes.bool.isRequired,
   showModal: PropTypes.bool.isRequired,
   handleCloseModal: PropTypes.func.isRequired
}

export default Modal
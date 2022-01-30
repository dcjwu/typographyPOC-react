import { useRef, useState } from "react"

import axios from "axios"

import Button from "../_UI/Button"
import Modal from "../_UI/Modal"
import UploadProgress from "./UploadProgress"

const FileUpload = ({ orderId }) => {
   console.log(orderId)
   const fileInput = useRef()
   const [showModal, setShowModal] = useState(false)
   const [uploadPercentage, setUploadPercentage] = useState(0)
   const [uploadDesign, setUploadDesign] = useState(false)
   const [loading, setLoading] = useState(false)
   const [isFileUploaded, setIsFileUploaded] = useState(false)
   const [fileUploadError, setFileUploadError] = useState(null)
   const [fileValidationError, setFileValidationError] = useState(false)

   const handleDesignRequired = () => {
      setUploadDesign(prev => !prev)
   }

   const handleCloseModal = () => {
      setShowModal(false)
      setFileUploadError(null)
      setUploadPercentage(0)
      setLoading(false)
      setIsFileUploaded(false)
   }

   const uploadFile = async data => {
      await axios.post("https://paper-demo-file-upload.herokuapp.com/upload", data, {
         headers: { "Content-Type": "multipart/form-data" },
         onUploadProgress: progressEvent => {
            setLoading(true)
            setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
         }
      })
         .then(res => {
            if (res.status === 200) {
               setIsFileUploaded(true)
            } else {
               setFileUploadError("Unexpected Error")
            }
         })
         .catch(err => {
            if (err.response) {
               setFileUploadError(err.response.data)
            } else {
               setFileUploadError(err.message)
            }
            setShowModal(true)
            fileInput.current.value = ""
         })
   }

   const handleFileUpload = async e => {
      const currentFile = e.target.files[0]
      if (currentFile.type === "application/pdf") {
         setFileValidationError(false)
         const formData = new FormData()
         formData.append("orderId", orderId)
         formData.append("pdf-file", currentFile)
         await uploadFile(formData)
      } else {
         setFileValidationError(true)
         setShowModal(true)
         fileInput.current.value = ""
      }
   }

   const deleteFile = async data => {
      await axios.post("https://paper-demo-file-upload.herokuapp.com/delete", data, { headers: { "Content-Type": "multipart/form-data" } })
         .then(res => {
            if (res.status === 200) {
               setUploadPercentage(0)
               setLoading(false)
               setIsFileUploaded(false)
               fileInput.current.value = ""
            }
         })
         .catch(err => {
            setFileUploadError(err.message)
            setShowModal(true)
            fileInput.current.value = ""
         })
   }

   const handleFileDelete = async orderId => {
      const formData = new FormData()
      formData.append("orderId", orderId)
      await deleteFile(formData)
   }

   //TODO: 1. Validation for .pdf.
   //TODO: 2. If validation passed setState to handle disabled buttons + another color or whatever.

   return (
      <div className="mt-5">
         <div className="form-check form-switch">
            <input checked={uploadDesign} className="form-check-input"
                   id="flexSwitchCheckDefault" role="switch" type="checkbox"
                   onChange={handleDesignRequired}/>
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Upload Design</label>
         </div>
         {
            uploadDesign && <>
               <div className="file">
                  {
                     fileValidationError && <Modal handleCloseModal={handleCloseModal} isError={true} showModal={showModal}
                                                   top="5rem">
                        Please, upload .pdf file
                     </Modal>
                  }
                  {
                     fileUploadError && <Modal handleCloseModal={handleCloseModal} isError={true} showModal={showModal}
                                               top="5rem">
                        {fileUploadError}
                     </Modal>
                  }
                  <p>Please, upload <span className="text-primary">.pdf</span> design:</p>
                  <label className={`btn btn-outline-primary ${loading ? " disabled" : ""}`}>
                     <input ref={fileInput} disabled={loading}
                            name="pdf-file" type="file" onChange={handleFileUpload}/>
                     <p>Upload</p>
                  </label>
                  <Button additionalClass={`btn btn-outline-danger ${!isFileUploaded ? " disabled" : ""}`}
                          onClick={() => handleFileDelete(orderId)}>
                     Delete
                  </Button>
               </div>
               <div className="upload-progress">
                  <UploadProgress isError={fileUploadError} isFileUploaded={isFileUploaded} percentage={uploadPercentage}/>
               </div>
            </>
         }
      </div>
   )
}

export default FileUpload
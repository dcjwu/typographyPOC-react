import { useEffect, useRef, useState } from "react"

import axios from "axios"

import { prodServerUrl } from "../../utils/constants"
import Button from "../_UI/Button"
import Modal from "../_UI/Modal"
import UploadProgress from "./UploadProgress"

const FileUpload = ({ orderId, handleDesignUpload, handleDisabledButton, handleWaitingForServer }) => {
   const fileInput = useRef()
   const abortController = useRef(null)
   const [showModal, setShowModal] = useState(false)
   const [uploadPercentage, setUploadPercentage] = useState(0)
   const [uploadDesign, setUploadDesign] = useState(false)
   const [loading, setLoading] = useState(false)
   const [isFileUploaded, setIsFileUploaded] = useState(false)
   const [fileUploadError, setFileUploadError] = useState(null)
   const [fileValidationError, setFileValidationError] = useState(false)

   useEffect(() => {
      abortController.current = new AbortController()
      return () => (abortController.current.abort())
   }, [])

   const handleDesignRequired = async () => {
      await setUploadDesign(prev => !prev)
      handleDesignUpload(!uploadDesign)
      handleDisabledButton(true)
   }

   const handleCloseModal = () => {
      setShowModal(false)
      setFileUploadError(null)
      setUploadPercentage(0)
      setLoading(false)
      setIsFileUploaded(false)
   }

   const uploadFile = async data => {
      await axios.post(`${prodServerUrl}/upload`, data, {
         headers: { "Content-Type": "multipart/form-data" },
         signal: abortController.current.signal,
         onUploadProgress: progressEvent => {
            handleWaitingForServer(false)
            setLoading(true)
            setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
         }
      })
         .then(res => {
            if (res.status === 200) {
               setIsFileUploaded(true)
               handleDisabledButton(false)
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
            if (fileInput.current) {
               fileInput.current.value = ""
            }
         })
   }

   const cancelFileUpload = () => {
      abortController.current.abort()
      abortController.current = new AbortController()
      setFileUploadError(null)
      setUploadPercentage(0)
      setLoading(false)
      setIsFileUploaded(false)
      if (fileInput.current) {
         fileInput.current.value = ""
      }
   }

   const handleFileUpload = async e => {
      const currentFile = e.target.files[0]
      if (currentFile.type === "application/pdf") {
         setFileValidationError(false)
         const formData = new FormData()
         formData.append("orderId", orderId)
         formData.append("pdf-file", currentFile)
         handleWaitingForServer(true)
         await uploadFile(formData)
      } else {
         setFileValidationError(true)
         setShowModal(true)
         fileInput.current.value = ""
      }
   }

   const deleteFile = async data => {
      await axios.post(`${prodServerUrl}/delete`, data, { headers: { "Content-Type": "multipart/form-data" } })
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

   return (
      <>
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
                                                      top="10rem">
                           Please, upload .pdf file
                        </Modal>
                     }
                     {
                        fileUploadError && <Modal handleCloseModal={handleCloseModal} isError={true} showModal={showModal}
                                                  top="10rem">
                           {fileUploadError}
                        </Modal>
                     }
                     <label className={`btn btn-custom w-50 ${!!fileUploadError || loading ? " disabled" : ""}`}>
                        <input ref={fileInput} disabled={!!fileUploadError || loading}
                               name="pdf-file" type="file" onChange={handleFileUpload}/>
                        <p>Upload your .pdf File</p>
                     </label>
                     <Button additionalClass={`error ${!isFileUploaded ? " disabled" : ""}`}
                             onClick={() => handleFileDelete(orderId)}>
                        Delete
                     </Button>
                     <Button additionalClass={`error ${!uploadPercentage || uploadPercentage === 100 ? " disabled" : ""}`} onClick={cancelFileUpload}>
                        Cancel
                     </Button>
                  </div>
                  <div className="upload-progress">
                     <UploadProgress isError={fileUploadError} isFileUploaded={isFileUploaded} percentage={uploadPercentage}/>
                  </div>
               </>
            }
         </div>
      </>
   )
}

export default FileUpload
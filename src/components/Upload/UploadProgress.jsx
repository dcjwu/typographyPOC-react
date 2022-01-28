const UploadProgress = ({ percentage, isFileUploaded, isError }) => {
   return (
      <div className="progress mt-3">
         <div className={`progress-bar${!isError ? " bg-success" : " bg-danger"}${!isFileUploaded ? " progress-bar-striped" +
            " progress-bar-animated" : ""}`}
               role="progressbar"
               style={{ width: `${percentage}%` }}
         >
            {percentage}%
         </div>
      </div>
   )
}

export default UploadProgress
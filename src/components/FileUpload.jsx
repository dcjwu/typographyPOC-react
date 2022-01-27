import axios from "axios"

const FileUpload = ({ orderId }) => {

   const handleFileUpload = e => {
      const formData = new FormData()
      formData.append("orderId", orderId)
      formData.append("pdf-file", e.target.files[0])

      axios.post("http://localhost:8000/upload", formData, { headers: { "Content-Type": "multipart/form-data" } })
         .then(res => {
            console.log(res)
         })
         .catch(error => {
            console.log(error)
         })
   }

   //TODO: 1. Validation for .pdf.
   //TODO: 2. If validation passed setState to handle disabled buttons + another color or whatever.

   return (
      <div className="file">
         <p>Please, upload <span>.pdf</span> design:</p>
         <label className="btn btn-outline-primary">
            <input name="pdf-file" type="file" onChange={handleFileUpload}/>
            <p>Upload File</p>
         </label>
      </div>
   )
}

export default FileUpload
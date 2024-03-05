import React, { useState } from 'react'
import axios from 'axios'
const UploadDocument = ({ data, onNext, onBack }) => {
  const [selectedFiles, setSelectedFiles] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files)
  }

  const handleUpload = async () => {
    if (!selectedFiles) {
      alert('Please select files to upload.')
      return
    }

    const formData = new FormData()
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i])
    }

    try {
      const response = await axios.post('YOUR_API_ENDPOINT', formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
          setUploadProgress(progress)
        },
      })

      // Handle API response if needed
      console.log('Upload successful:', response.data)
    } catch (error) {
      console.error('Error uploading files:', error)
      alert('Error uploading files. Please try again later.')
    }
  }

  const handleNext = () => {
    // Validate other data if needed
    const otherData = {};
    onNext({ ...data, otherData });
  };

  const handleBack = () => {
    // Validate other data if needed
    const otherData = {};
    onBack({ ...data, otherData });
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
      <button type="submit" onClick={handleNext} className="btn btn-primary px-4">
            Next
          </button>

          <button type="submit" onClick={handleBack} className="btn btn-primary px-4">
            Back
          </button>
    </div>
  )
}

export default UploadDocument

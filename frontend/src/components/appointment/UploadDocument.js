import React, { useContext, useEffect, useState } from 'react'
import UserContext from 'src/utils/UserContext'
import axios from 'axios'
import { DEFAULT_URL } from 'src/utils/Constant'
import { CSpinner, CToast, CToastBody, CToastClose } from '@coreui/react'

const UploadDocument = ({ data, onNext, onBack }) => {
  const { user } = useContext(UserContext)
  const [formData, setFormData] = useState(data)
  const [selectedFiles, setSelectedFiles] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  console.log('Upload Document', data)

  useEffect(() => {
    if (data) {
      setFormData(data)
      getDocBasedOnSubApplicationAndConsultant()
    }

  }, [data])


  const getDocBasedOnSubApplicationAndConsultant = async () => {
    const consultant_id = formData.consultant_data._id
    const sub_application_id = formData.service_data._id

    const response = await axios.get(
      `${DEFAULT_URL}document/getDocBasedOnSubApplicationAndConsultant`,
      {
        sub_application_id,
        consultant_id,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.jwtToken}`,
        },
      },
    )
    setErrorMessage(response.data.data)
    setAlertVisible(true)
    console.log(response.data.data)
  }
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
    const otherData = {}
    onNext({ ...data, otherData })
  }

  const handleBack = () => {
    // Validate other data if needed
    const otherData = {}
    onBack({ ...data, otherData })
  }

  return (
    <div>
      {isLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: '100vh' }}
        >
          <CSpinner />
        </div>
      )}
      {alertVisible && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: '9999' }}>
          <CToast
            autohide={false}
            visible={true}
            color="primary"
            className="text-white align-items-center"
            onClose={() => setAlertVisible(false)}
          >
            <div className="d-flex">
              <CToastBody>{errorMessage}</CToastBody>
              <CToastClose className="me-2 m-auto" white />
            </div>
          </CToast>
        </div>
      )}
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

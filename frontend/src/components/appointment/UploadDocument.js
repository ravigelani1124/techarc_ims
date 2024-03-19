import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { CSpinner, CToast, CToastBody, CToastClose } from '@coreui/react'
import UserContext from 'src/utils/UserContext'
import { DEFAULT_URL } from 'src/utils/Constant'

const UploadDocument = ({ data, onNext, onBack }) => {
  const { user } = useContext(UserContext)
  const [formData, setFormData] = useState(data)
  const [selectedFiles, setSelectedFiles] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    if (data) {
      setFormData(data)      
      getDocBasedOnSubApplicationAndConsultant()
    }
  }, [data])

  
  const getDocBasedOnSubApplicationAndConsultant = async () => {
    const { consultant_data, service_data } = formData.booking_details
    const consultant_id = consultant_data._id
    const sub_application_id = service_data._id

    console.log({ sub_application_id, consultant_id })

    try {
      const response = await axios.post(
        `${DEFAULT_URL}document/getDocBasedOnSubApplicationAndConsultant`,
        { sub_application_id: sub_application_id, consultant_id: consultant_id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.jwtToken}`,
          },
        },
      )

      if (response.status === 200) {
        // Assuming response.data contains documents and message fields
        setDocuments(response.data.data) // Set documents state
        setErrorMessage(response.data.message) // Set error message state
        setAlertVisible(true) // Set alert visibility state
      } else {
        // Handle non-200 status codes
        setErrorMessage('Error fetching documents. Please try again later.')
        setAlertVisible(true)
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error fetching documents:', error)
      setErrorMessage('Error fetching documents. Please try again later.')
      setAlertVisible(true)
    }
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

      console.log('Upload successful:', response.data)
    } catch (error) {
      console.error('Error uploading files:', error)
      alert('Error uploading files. Please try again later.')
    }
  }

  const handleNext = () => {
    const otherData = {}
    onNext({ ...data, otherData })
  }

  const handleBack = () => {
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

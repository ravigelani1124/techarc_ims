import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {
  CSpinner,
  CToast,
  CToastBody,
  CToastClose,
  CForm,
  CButton,
  CFormInput,
  CFormLabel,
} from '@coreui/react'
import UserContext from 'src/utils/UserContext'
import { DEFAULT_URL } from 'src/utils/Constant'

const UploadDocument = ({ data, onNext, onBack }) => {
  const { user } = useContext(UserContext)
  const [formData, setFormData] = useState(data)
  const [selectedFiles, setSelectedFiles] = useState({})
  const [uploadProgress, setUploadProgress] = useState({})
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
    setIsLoading(true)
    const { consultant_data, service_data } = formData.booking_details
    const consultant_id = consultant_data._id
    const sub_application_id = service_data._id

    try {
      const response = await axios.post(
        `${DEFAULT_URL}document/getDocBasedOnSubApplicationAndConsultant`,
        { sub_application_id, consultant_id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.jwtToken}`,
          },
        },
      )

      if (response.status === 200) {
        setDocuments(response.data.data)
      } else {
        setErrorMessage('Error fetching documents. Please try again later.')
        setAlertVisible(true)
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error('Error fetching documents:', error)
      setErrorMessage('Error fetching documents. Please try again later.')
      setAlertVisible(true)
    }
  }

  const handleFileChange = (event, documentId) => {
    const files = event.target.files
    setSelectedFiles((prevState) => ({
      ...prevState,
      [documentId]: files,
    }))

    console.log('handle File change', selectedFiles)
  }

  const handleUpload = async (documentId) => {
    const files = selectedFiles[documentId]
    if (!files || files.length === 0) {
      setErrorMessage('Please select a file to upload.')
      setAlertVisible(true)
      return
    }

    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }

    try {
      const response = await axios.post('YOUR_API_ENDPOINT', formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
          setUploadProgress((prevState) => ({
            ...prevState,
            [documentId]: progress,
          }))
        },
      })

      setErrorMessage('File uploaded successfully.')
      setAlertVisible(true)
      console.log('Upload successful:', response.data)
    } catch (error) {
      setErrorMessage('Error uploading files. Please try again later.')
      setAlertVisible(true)
      console.error('Error uploading files:', error)
    }
  }

  const handleNext = () => {
    const allDocumentsUploaded = Object.values(selectedFiles).every(
      (files) => files && files.length > 0,
    )
    if (!allDocumentsUploaded) {
      setErrorMessage('Please upload all documents before proceeding.')
      setAlertVisible(true)
      return
    }

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
      <CForm>
        {documents.map((document, index) => (
          <div key={index} className="mb-3 d-flex  justify-content-center flex-column">
            <CFormLabel htmlFor={`formFile-${index}`}>{document.document_name}</CFormLabel>

            <div className="md-3 d-flex align-items-center">
              <CFormInput
                type="file"
                id={`formFile-${index}`}
                onChange={(event) => handleFileChange(event, document._id)}
                className="me-2"
              />

              <CButton
                style={{ marginBottom: '10px' }}
                color="secondary"
                onClick={() => handleUpload(document._id)}
                className="mt-2"
              >
                Upload
              </CButton>
            </div>

            {/* {uploadProgress[document._id] > 0 && (
              <p className="mb-0 mt-2">Upload Progress: {uploadProgress[document._id]}%</p>
            )} */}
          </div>
        ))}
      </CForm>
      <div className="d-flex justify-content-between">
        {/* <button type="submit" onClick={handleBack} className="btn btn-primary px-4 py-2">
          Back
        </button> */}
        <button type="submit" onClick={handleNext} className="btn btn-primary px-4 py-2">
          Next
        </button>
      </div>
    </div>
  )
}

export default UploadDocument

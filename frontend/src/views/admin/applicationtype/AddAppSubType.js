import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import UserContext from 'src/utils/UserContext'
import { CSpinner, CToast, CToastBody, CToastClose } from '@coreui/react'
import { DEFAULT_URL } from 'src/utils/Constant'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CListGroup,
  CListGroupItem,
  CFormCheck,
  CButtonGroup,
} from '@coreui/react'
import DocumentListItem from './DocumentListItem'
const AddAppSubType = () => {
  const [loading, setLoading] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [applicationType, setApplicationType] = useState()
  const [applicationTypeList, setApplicationTypeList] = useState([])
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [documents, setDocuments] = useState([])
  const [selectedDocs, setSelectedDocs] = useState([])

  const [formData, setFormData] = useState({
    application_id: '',
    sub_application_code: '',
    sub_application_description: '',
    documents: [],
    created_by: '',
    updated_by: '',
  })

  useEffect(() => {
    document.title = 'Add Application SubType'
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  useEffect(() => {
    fetchDocuments()
  }, [user])

  const fetchDocuments = async () => {
    try {
      const token = user?.jwtToken
      const response = await axios.get(`${DEFAULT_URL}document/getdocuments`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      setDocuments(response.data.data)
      callSelectedDoc(subItem)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const token = user?.jwtToken
        const response = await axios.get(`${DEFAULT_URL}application/getapplicationtype`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        setApplicationTypeList(response.data.data)
      } catch (error) {
        setErrorMessage(error.response.data)
        setAlertVisible(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    console.log('test', selectedDocs)
    setLoading(true)

    const parsedFormData = {
      ...formData,
      application_id: applicationType?._id,
      documents: selectedDocs,
      created_by: user?._id,
      updated_by: user?._id,
    }

    console.log('test', parsedFormData)
    try {
      const response = await axios.post(
        `${DEFAULT_URL}application/addsubapplicationtype`,
        parsedFormData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.jwtToken}`,
          },
        },
      )
      setErrorMessage(response.data.message)
      setAlertVisible(true)
      clearForm()
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleError = (error) => {
    let message = 'An error occurred'
    if (error.response) {
      message = error.response.data.message + ' || ' + 'Validation failed'
    } else if (error.request) {
      message = error.request
    } else {
      message = error.message
    }
    setErrorMessage(message)
    setAlertVisible(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const clearForm = () => {
    setFormData({
      application_id: '',
      sub_application_code: '',
      sub_application_description: '',
      created_by: '',
      updated_by: '',
    })

    setSelectedDocs([])    
  }

  const handleApplicationTypeChange = (e) => {
    setApplicationType(e.target.value)
    const selectedApplicationType = applicationTypeList.find(
      (application) => application._id === e.target.value,
    )
    console.log('selected', selectedApplicationType)
    setApplicationType(selectedApplicationType)
  }

  const handleSelectAll = () => {
    const allDocumentIds = documents.map((doc) => doc._id)
    setSelectedDocs(allDocumentIds)
  }

  const handleDeselectAll = () => {
    setSelectedDocs([])
  }
  const handleSave = () => {
    // You can handle saving the selected documents here
  }

  return (
    <div>
      <AppSidebar />
      {loading && (
        <div className="position-fixed top-50 start-50 end-50 translate-middle">
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
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <div style={{ padding: '0 20px' }}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="application_type" className="form-label">
                  Application Type
                </label>
                <select
                  id="application_type"
                  className="form-select form-select-md"
                  aria-label=".form-select-sm example"
                  required
                  value={applicationType}
                  onChange={handleApplicationTypeChange}
                >
                  <option value="" disabled selected>
                    Select..
                  </option>
                  {applicationTypeList.map((applicationType) => (
                    <option key={applicationType._id} value={applicationType._id}>
                      {applicationType.application_description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="sub_application_code" className="form-label">
                  Sub Application Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sub_application_code"
                  name="sub_application_code"
                  placeholder="CON234"
                  pattern="[A-Za-z0-9]{1,6}"
                  required
                  autoFocus
                  onChange={handleChange}
                  value={formData.sub_application_code}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="sub_application_description" className="form-label">
                  Sub Application Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sub_application_description"
                  name="sub_application_description"
                  placeholder="Sub Application Description"
                  pattern="[A-Za-z\s\-]+"
                  required
                  autoFocus
                  onChange={handleChange}
                  value={formData.sub_application_description}
                />
              </div>

              <div
                style={{
                  border: '1px solid #ccc',
                  padding: '10px',
                  marginBottom: '20px',
                  marginTop: '20px',
                }}
              >
                <CModalHeader closeButton={false}>
                  <label htmlFor="sub_application_description" className="form-label">
                    Select Documents
                  </label>
                </CModalHeader>
                <CModalBody>
                  <CListGroup>
                    {documents.map((document) => (
                      <DocumentListItem
                        key={document._id}
                        document={document}
                        selectedDocs={selectedDocs}
                        setSelectedDocs={setSelectedDocs}
                      />
                    ))}
                  </CListGroup>
                </CModalBody>
              </div>
              <div className="mb-3 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary px-4">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default AddAppSubType

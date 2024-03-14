import React, { useEffect, useState, useContext } from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CSpinner,
} from '@coreui/react'
import { CToast, CToastBody, CToastClose } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPenAlt } from '@coreui/icons'
import { AppSidebar, AppHeader, AppFooter } from 'src/components'
import UserContext from 'src/utils/UserContext'
import axios from 'axios'
import { DEFAULT_URL } from 'src/utils/Constant'
import NoDataView from 'src/components/NoDataView'
import EditApplicationTypeModal from './EditApplicationTypeModel'

const ApplicationTypeList = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { user } = useContext(UserContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [documents, setDocuments] = useState([])
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)

  useEffect(() => {
    document.title = 'Application Types'
    fetchDocuments()
  }, [user])

  const fetchDocuments = async () => {
    setIsLoading(true)
    try {
      const token = user?.jwtToken
      const response = await axios.get(`${DEFAULT_URL}application/getapplicationtype`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      setDocuments(response.data.data)      
    } catch (error) {
      setErrorMessage(error.response.data)
      setAlertVisible(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditClick = (document) => {
    console.log(document)
    setSelectedDocument(document)
    setModalOpen(true)
    console.log(modalOpen)
  }

  const handleSave = (updatedDocument) => {
    // Example: Save to API
    console.log('Updated Document:', updatedDocument)
    // Implement API call to save the updated document
    setModalOpen(false)
    updateApplicationType(updatedDocument._id, updatedDocument.application_description)
  }

  const updateApplicationType = async (id, application_description) => {
    try {
      const token = user?.jwtToken
      const response = await axios.post(
        `${DEFAULT_URL}application/updateapplicationtype/${id}`,
        {
          application_description: application_description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setErrorMessage(response.data.message)
      setAlertVisible(true)
      fetchDocuments()
    } catch (error) {
      handleError(error)
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

  const filteredDocuments = documents.filter((item) =>
    item.application_description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        {alertVisible && (
          <div
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: '9999', // Ensure it's above other content
            }}
          >
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
        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh' }}
          >
            <CSpinner />
          </div>
        ) : documents.length === 0 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '80vh',
            }}
          >
            <NoDataView message="Document data not available" />
          </div>
        ) : (
          <div>
            <div className="mb-3" style={{ padding: '0 20px' }}>
              <CFormInput
                placeholder="Search document by name.."
                aria-label="Search input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div style={{ padding: '0 20px' }}>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Code</CTableHeaderCell>
                    <CTableHeaderCell>Application Type</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredDocuments.map((document, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{document.application_code}</CTableDataCell>
                      <CTableDataCell>{document.application_description}</CTableDataCell>
                      <CTableDataCell>
                        <CIcon
                          onClick={() => handleEditClick(document)}
                          icon={cilPenAlt}
                          className="text-primary"
                          size="xl"
                        />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
            {modalOpen && (
              <EditApplicationTypeModal
                document={selectedDocument}
                onSave={handleSave}
                onClose={() => setModalOpen(false)}
              />
            )}
          </div>
        )}

        <AppFooter />
      </div>
    </>
  )
}

export default ApplicationTypeList

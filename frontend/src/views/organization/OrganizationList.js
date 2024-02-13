import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import UserContext from 'src/utils/UserContext'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CFormInput,
  CSpinner,
  CToast,
  CToastBody,
  CToastClose,
} from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index'

import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilXCircle } from '@coreui/icons'

import { DEFAULT_URL } from 'src/utils/Constant'

const OrganizationList = () => {

  useEffect(() => {
    document.title = 'Admin | Organization';
  }, []);

  const [showForm, setShowForm] = useState(false)
  const [consultancies, setConsultancies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const { user } = useContext(UserContext)

  useEffect(() => {
    fetchDataForConsultancy()
  }, [user])

  const fetchDataForConsultancy = async () => {
    setIsLoading(true)
    try {
      const token = user.jwtToken
      if (!token) {
        throw new Error('Login Required')
      }
      const response = await axios.get(DEFAULT_URL + 'organization/getorganizations', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      setConsultancies(response.data.data)
    } catch (error) {
      console.error(error)
      setAlertVisible(true)
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredConsultancies = consultancies.filter((item) =>
    item.org_name_en.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        {isLoading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh' }}
          >
            <CSpinner />
          </div>
        )}

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
            >
              <div className="d-flex">
                <CToastBody>{errorMessage}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
              </div>
            </CToast>
          </div>
        )}
        <div className="mb-4">
          {/* <div className="mb-3 d-flex justify-content-end" style={{ padding: '0 20px' }}>
            <h4>
              <CButton color="primary" onClick={handleAddConsultancyClick}>
                Add New Consultancy Group
              </CButton>
            </h4>
          </div>
          {showForm && (
            <div>
              <OrganizationForm
                onClose={() => setShowForm(false)}
                updateConsultancies={updateConsultancies}
              />
              <br />
            </div>
          )} */}

          <div className="mb-3" style={{ padding: '0 20px' }}>
            <CFormInput
              placeholder="Search Organizations..."
              aria-label="Search input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            />
          </div>
        </div>
        <div style={{ padding: '0 20px' }}>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Org. Code</CTableHeaderCell>
                <CTableHeaderCell>Organization Name</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Phone</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>                  
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredConsultancies.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>
                    <div>{index + 1}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.org_code}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.org_name_en}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    {item.is_email_verified ? (
                      <div>
                        {<CIcon icon={cilCheckCircle} className="text-success" size="xl" />}
                      </div>
                    ) : (
                      <div>{<CIcon icon={cilXCircle} className="text-danger" size="xl" />}</div>
                    )}
                  </CTableDataCell>
                  <CTableDataCell>
                    {item.is_phone_verified ? (
                      <div>
                        {<CIcon icon={cilCheckCircle} className="text-success" size="xl" />}
                      </div>
                    ) : (
                      <div>{<CIcon icon={cilXCircle} className="text-danger" size="xl" />}</div>
                    )}
                  </CTableDataCell>
                  <CTableDataCell>
                    {item.record_status ? (
                      <div>
                        {<CButton  style={{ width: '100px' }} color="success">Active</CButton>}                      
                      </div>
                    ) : (
                      <div>{<CButton  style={{ width: '100px' }} color="danger">In Active</CButton>}</div>
                    )}
                    </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </div>
        <AppFooter />
      </div>
    </>
  )
}

export default OrganizationList

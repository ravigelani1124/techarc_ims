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
import NoDataView from 'src/components/NoDataView'

const OrganizationList = () => {
  useEffect(() => {
    document.title = 'Admin | Organization'
  }, [])

  const [showForm, setShowForm] = useState(false)
  const [consultancies, setConsultancies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const { user } = useContext(UserContext)

  const [expandedRows, setExpandedRows] = useState([])

  const toggleRow = (index) => {
    const newExpandedRows = [...expandedRows]
    if (newExpandedRows.includes(index)) {
      const indexToRemove = newExpandedRows.indexOf(index)
      newExpandedRows.splice(indexToRemove, 1)
    } else {
      newExpandedRows.push(index)
    }
    setExpandedRows(newExpandedRows)
  }

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

  const handleUpdateStatus = async (item) => {
    setIsLoading(true)

    try {
      const id = item._id
      const isActive = !item.record_status
      const role = item.role

      console.log(id, isActive, role)
      const response = await axios.post(DEFAULT_URL + 'auth/updateuserstatus', {
        id: id,
        isActive: isActive,
        role: role,
      })

      if (response.status === 200) {
        setIsLoading(false)
        setErrorMessage(response.data.message)
        setAlertVisible(true)
        fetchDataForConsultancy()
      } else {
        setIsLoading(false)
        setErrorMessage(response.data.message)
        setAlertVisible(true)
        console.error(response.data.message)
      }
    } catch (error) {
      setIsLoading(false)
      setErrorMessage(error.message)
      setAlertVisible(true)
      console.error(error.message)
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
              onClose={() => setAlertVisible(false)}
            >
              <div className="d-flex">
                <CToastBody>{errorMessage}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
              </div>
            </CToast>
          </div>
        )}

        {consultancies.length === 0 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '80vh', // Adjust as needed
            }}
          >
            <NoDataView message="Organization data not available" />
          </div>
        ) : (
          <div>
            <div className="mb-3" style={{ padding: '0 20px' }}>
              <CFormInput
                placeholder="Search Organizations..."
                aria-label="Search input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
              />
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
                    <React.Fragment key={index}>
                      <CTableRow onClick={() => toggleRow(index)}>
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
                            <div>
                              {<CIcon icon={cilXCircle} className="text-danger" size="xl" />}
                            </div>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {item.is_phone_verified ? (
                            <div>
                              {<CIcon icon={cilCheckCircle} className="text-success" size="xl" />}
                            </div>
                          ) : (
                            <div>
                              {<CIcon icon={cilXCircle} className="text-danger" size="xl" />}
                            </div>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {item.record_status ? (
                            <div>
                              {
                                <CButton
                                  onClick={() => handleUpdateStatus(item)}
                                  style={{ width: '100px' }}
                                  color="success"
                                >
                                  Active
                                </CButton>
                              }
                            </div>
                          ) : (
                            <div>
                              {
                                <CButton
                                  onClick={() => handleUpdateStatus(item)}
                                  style={{ width: '100px' }}
                                  color="danger"
                                >
                                  In Active
                                </CButton>
                              }
                            </div>
                          )}
                        </CTableDataCell>
                      </CTableRow>
                      {expandedRows.includes(index) && (
                        <CTableRow>
                          <CTableDataCell colSpan="7">
                            <div style={{ marginTop: '10px' }}>
                              <span style={{ fontWeight: 'bold' }}>
                                {item.address_type} Address:
                              </span>{' '}
                              {item.street_no} {item.street_name}, {item.city}, {item.state},{' '}
                              {item.country}, {item.zip}
                            </div>
                            <div style={{ marginTop: '10px' }}>
                              <span style={{ fontWeight: 'bold' }}>{item.phone_type} Contact:</span>{' '}
                              {item.org_phone}
                            </div>
                          </CTableDataCell>
                        </CTableRow>
                      )}
                    </React.Fragment>
                  ))}
                </CTableBody>
              </CTable>
            </div>
          </div>
        )}

        <AppFooter />
      </div>
    </>
  )
}

export default OrganizationList

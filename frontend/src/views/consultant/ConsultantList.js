import React, { useEffect, useState, useContext } from 'react'
import ConsultantForm from 'src/components/ConsultantForm'
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
} from '@coreui/react'
import { cilCheckCircle, cilXCircle } from '@coreui/icons'
import { AppSidebar, AppHeader, AppFooter } from '../../components/index'
import UserContext from 'src/utils/UserContext'
import axios from 'axios'
import { DEFAULT_URL } from 'src/utils/Constant'
import CIcon from '@coreui/icons-react'
import NoDataView from 'src/components/NoDataView'

const ConsultantList = () => {
  useEffect(() => {
    document.title = 'Admin | Consultant'
  }, [])

  const [consultant, setConsultant] = useState([])
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
    fetchDataForConsultant()
  }, [user])

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
        fetchDataForConsultant()
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
  const fetchDataForConsultant = async () => {
    setIsLoading(true)
    try {
      const token = user?.jwtToken
      const response = await axios.get(`${DEFAULT_URL}auth/getConsultantList`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      console.log('Consultant----', response.data.data)
      setConsultant(response.data.data)
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred')
      setAlertVisible(true)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredConsultants = consultant.filter((item) =>
    item.consultant_name_en.toLowerCase().includes(searchQuery.toLowerCase()),
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
        {consultant.length === 0 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '80vh', // Adjust as needed
            }}
          >
            <NoDataView message="Consultant data not available" />
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <div className="mb-3" style={{ padding: '0 20px' }}>
                <CFormInput
                  placeholder="Search Consultant Name..."
                  aria-label="Search input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div style={{ padding: '0 20px' }}>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Code</CTableHeaderCell>
                    <CTableHeaderCell>Consultant Name</CTableHeaderCell>
                    <CTableHeaderCell>Organization</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Phone</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredConsultants.map((item, index) => (
                    <React.Fragment key={index}>
                      <CTableRow onClick={() => toggleRow(index)}>
                        <CTableDataCell>
                          <div>{index + 1}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.consultant_code}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.consultant_name_en}</div>
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
                              {item.consultant_phone}
                            </div>
                          </CTableDataCell>
                        </CTableRow>
                      )}
                    </React.Fragment>
                  ))}
                </CTableBody>
              </CTable>
            </div>
            {/* <div style={{ padding: '0 20px' }}>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Code</CTableHeaderCell>
                    <CTableHeaderCell>Consultant Name</CTableHeaderCell>
                    <CTableHeaderCell>Organization</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Phone</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredConsultants.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <div>{index + 1}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.consultant_code}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.consultant_name_en}</div>
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
                  ))}
                </CTableBody>
                
              </CTable>
            </div> */}
          </div>
        )}

        <AppFooter />
      </div>
    </>
  )
}

export default ConsultantList

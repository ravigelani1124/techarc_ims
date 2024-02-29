import React, { useEffect, useState, useContext } from 'react'
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
import { AppSidebar, AppHeader, AppFooter } from '../../components/index'
import UserContext from 'src/utils/UserContext'
import axios from 'axios'
import { DEFAULT_URL } from 'src/utils/Constant'
import NoDataView from 'src/components/NoDataView'

const ServicesList = () => {
  useEffect(() => {
    document.title = 'Users'
  }, [])

  const [isLoading, setIsLoading] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { user } = useContext(UserContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [visas, setVisas] = useState([])

  useEffect(() => {
    fetchVisaTypesByConsultantId()
  }, [user])

  const fetchVisaTypesByConsultantId = () => {

    const consultantId = user._id

    if(!consultantId){
      setIsLoading(false)
      setErrorMessage('Login Required')
      setAlertVisible(true)
      return
    }
    setIsLoading(true)
    axios
      .get(`${DEFAULT_URL}visatype/getvisatypesbyconsultant/${consultantId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.jwtToken}`,
        },
      })
      .then((response) => {
        setIsLoading(false)
        setVisas(response.data.data)
      })
      .catch((error) => {
        setIsLoading(false)
        setErrorMessage(error.response.data)
        setAlertVisible(true)
      })
  }


  const filteredVisa = visas.filter((item) =>
    item.service_type_name.toLowerCase().includes(searchQuery.toLowerCase()),
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
        {visas.length === 0 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '80vh', // Adjust as needed
            }}
          >
            <NoDataView message="Services data not available" />
          </div>
        ) : (
          <div>
            <div className="mb-3" style={{ padding: '0 20px' }}>
              <CFormInput
                placeholder="Search services by name.."
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
                    <CTableHeaderCell>Country</CTableHeaderCell>
                    <CTableHeaderCell>Service</CTableHeaderCell>
                    <CTableHeaderCell>Service Fee</CTableHeaderCell>
                    <CTableHeaderCell>Consultant Fee</CTableHeaderCell>
                    {/* <CTableHeaderCell>Status</CTableHeaderCell> */}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredVisa.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <div>{index + 1}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.country}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.service_type_name}</div>
                      </CTableDataCell>

                      <CTableDataCell>
                        <div>{"$" + item.service_fee}</div>
                      </CTableDataCell>

                      <CTableDataCell>
                        <div>{"$" + item.consultant_fee}</div>
                      </CTableDataCell>

                      {/* <CTableDataCell>
                        {item.record_status ? (
                          <div>
                            {
                              <CButton style={{ width: '100px' }} color="success">
                                Active
                              </CButton>
                            }
                          </div>
                        ) : (
                          <div>
                            {
                              <CButton style={{ width: '100px' }} color="danger">
                                In Active
                              </CButton>
                            }
                          </div>
                        )}
                      </CTableDataCell> */}
                    </CTableRow>
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

export default ServicesList

import React, { useState, useContext, useEffect } from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index'
import UserContext from 'src/utils/UserContext'
import { useNavigate } from 'react-router-dom'
import NoDataView from 'src/components/NoDataView'
import {
  CButtonGroup,
  CButton,
  CSpinner,
  CListGroup,
  CListGroupItem,
  CFormCheck,
  CFormLabel,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from '@coreui/react'
import axios from 'axios'
import { DEFAULT_URL } from 'src/utils/Constant'

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [alertVisible, setAlertVisible] = useState(false)

  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  useEffect(() => {
    document.title = 'My Apointments'
    getAppointments()
  }, [])

  const getAppointments = async () => {
    try {
      setIsLoading(true)
      const jwtToken = user.jwtToken
      const response = await axios.get(
        `${DEFAULT_URL}appointments/getappointmentByUser/${user._id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )
      console.log(response.data.data)
      setAppointments(response.data.data)
    } catch (error) {
      console.log(error)
      setErrorMessage('Error fetching appointments')
      setAlertVisible(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = (item) => {
    console.log(item)
  }

  return (
    <div>
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
        {appointments.length === 0 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '80vh', // Adjust as needed
            }}
          >
            <NoDataView message="Appointments data not available" />
          </div>
        ) : (
          <div>
            <div style={{ padding: '0 20px' }}>
              <CAccordion alwaysOpen>
                {appointments.map((item, index) => (
                  <CAccordionItem
                    style={{ backgroundColor: '#f9f9f9' }}
                    key={index}
                    itemKey={index}
                  >
                    <CAccordionHeader>
                      {item.appointment.application_type} : {item.appointment.appsub_type}
                    </CAccordionHeader>
                    <CAccordionBody>
                      <div
                        style={{
                          border: '1px solid #ccc',
                          padding: '10px',
                          marginBottom: '20px',
                          backgroundColor: '#ffffff',
                        }}
                      >
                        <CFormLabel
                          htmlFor="consultant"
                          style={{ marginBottom: '10px', display: 'block' }}
                        >
                          <strong>Application Details</strong>
                        </CFormLabel>

                        <CFormLabel
                          htmlFor="consultant"
                          style={{ marginBottom: '5px', display: 'block' }}
                        >
                          {item.appointment.application_type} : {item.appointment.appsub_type}
                        </CFormLabel>
                      </div>

                      <div
                        style={{
                          border: '1px solid #ccc',
                          padding: '10px',
                          marginBottom: '20px',
                          backgroundColor: '#ffffff',
                        }}
                      >
                        <CFormLabel
                          htmlFor="consultant"
                          style={{ marginBottom: '10px', display: 'block' }}
                        >
                          <strong>Consultant Details</strong>
                        </CFormLabel>

                        <CFormLabel
                          htmlFor="consultant"
                          style={{ marginBottom: '5px', display: 'block' }}
                        >
                          {item.consultant.consultant_name_en}
                        </CFormLabel>
                        <CFormLabel
                          htmlFor="consultant"
                          style={{ marginBottom: '5px', display: 'block' }}
                        >
                          {item.consultant.consultant_email} | {item.consultant.consultant_phone}
                        </CFormLabel>
                        <CFormLabel
                          htmlFor="consultant"
                          style={{ marginBottom: '5px', display: 'block' }}
                        >
                          {item.consultant.street_no}, {item.consultant.street_name},
                          {item.consultant.city}, {item.consultant.state}, {item.consultant.zip},{' '}
                          {item.consultant.country}
                        </CFormLabel>
                      </div>

                      <div
                        style={{
                          border: '1px solid #ccc',
                          padding: '10px',
                          marginBottom: '20px',
                          backgroundColor: '#ffffff',
                        }}
                      >
                        <CFormLabel
                          htmlFor="consultant"
                          style={{ marginBottom: '10px', display: 'block' }}
                        >
                          <strong>Time Slot</strong>
                        </CFormLabel>

                        <CFormLabel
                          htmlFor="consultant"
                          style={{ marginBottom: '5px', display: 'block' }}
                        >
                          {item.appointment.timeslot_date} {item.appointment.timeslot_start_time}-{' '}
                          {item.appointment.timeslot_end_time}
                        </CFormLabel>
                      </div>

                      <div
                        style={{
                          border: '1px solid #ccc',
                          padding: '10px',
                          marginBottom: '20px',
                          backgroundColor: '#ffffff',
                        }}
                      >
                        <CFormLabel
                          htmlFor="consultant"
                          style={{ marginBottom: '10px', display: 'block' }}
                        >
                          <strong>Documents</strong>
                        </CFormLabel>
                        <CListGroup color="light" label="Documents">
                          {item.appointment.documents.map((subItem, subIndex) => (
                            <CListGroupItem className="d-flex justify-content-between align-items-center">
                              <div className="label-container">
                                <label htmlFor="application_code" className="form-label">
                                  {subItem.document_name}
                                </label>
                              </div>
                              <div className="badge-container">
                                <span
                                  className={`badge ${
                                    subItem.is_optional ? 'bg-success' : 'bg-danger'
                                  }`}
                                >
                                  {subItem.is_optional ? 'Optional' : 'Required'}
                                </span>
                              </div>
                            </CListGroupItem>
                          ))}
                        </CListGroup>
                      </div>
                      <div
                        style={{
                          border: '1px solid #ccc',
                          padding: '10px',
                          marginBottom: '20px',
                          backgroundColor: '#ffffff',
                        }}
                      >
                        <CFormLabel
                          htmlFor="consultant"
                          style={{ marginBottom: '10px', display: 'block' }}
                        >
                          <strong>Price Breakdown</strong>
                        </CFormLabel>

                        <CFormLabel
                          htmlFor="consultant"
                          style={{ marginBottom: '5px', display: 'block' }}
                        >
                          {'Consultant Fees'} : ${item.appointment.consultant_fee}
                        </CFormLabel>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <CButton color="primary" onClick={() => handleDownload(item)}>
                          Download PDF
                        </CButton>
                      </div>
                    </CAccordionBody>
                  </CAccordionItem>
                ))}
              </CAccordion>
            </div>
          </div>
        )}

        <AppFooter />
      </div>
    </div>
  )
}

export default MyAppointments

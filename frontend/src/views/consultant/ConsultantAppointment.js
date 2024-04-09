import React, { useState, useContext, useEffect } from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index'
import UserContext from 'src/utils/UserContext'
import { useNavigate } from 'react-router-dom'
import NoDataView from 'src/components/NoDataView'
import {
  CButton,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
} from '@coreui/react'
import axios from 'axios'
import { DEFAULT_URL } from 'src/utils/Constant'
import AppointmentDetailsModel from './model/AppointmentDetailsModel'

const ConsultantAppointment = () => {
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [alertVisible, setAlertVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [appointmentDetails, setAppointmentDetails] = useState({})
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  useEffect(() => {
    document.title = 'My Appointments'
    getAppointments()
    return () => setIsModalOpen(false) // Close modal when component unmounts
  }, [])

  const handleDetailsModel = (item) => {
    setAppointmentDetails(item)
    setIsModalOpen(true)
  }

  const getAppointments = async () => {
    try {
      setIsLoading(true)
      const jwtToken = user.jwtToken
      const response = await axios.get(
        `${DEFAULT_URL}appointments/getappointmentByConsultant/${user._id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )
      setAppointments(response.data.data)
    } catch (error) {
      setErrorMessage('Error fetching appointments')
      setAlertVisible(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateStatus = async (item) => {
    try {
      setIsLoading(true)
      const isActive = !item.appointment.is_active
      const jwtToken = user.jwtToken
      console.log(item)
      const response = await axios.put(
        `${DEFAULT_URL}appointments/changeAppointmentStatus/${item.appointment._id}`,
        {
          isActive: isActive,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )
      if (response.status === 200) {
        setIsLoading(false)
        setErrorMessage(response.data.message)
        setAlertVisible(true)
        getAppointments()
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

  const filterData = appointments.filter((item) =>
    item.user.user_name_en.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center min-vh-100">
            <CSpinner />
          </div>
        ) : appointments.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center min-vh-100">
            <NoDataView message="Appointments data not available" />
          </div>
        ) : (
          <div>
            <div style={{ padding: '0 20px' }}>
              <div className="mb-3" style={{ padding: '0 20px' }}>
                <CFormInput
                  placeholder="Search users by name.."
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
                      <CTableHeaderCell>User Name</CTableHeaderCell>
                      <CTableHeaderCell>Application Type</CTableHeaderCell>
                      <CTableHeaderCell>Date</CTableHeaderCell>
                      <CTableHeaderCell>Time</CTableHeaderCell>
                      <CTableHeaderCell>Info</CTableHeaderCell>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {filterData.map((item, index) => (
                      <React.Fragment key={index}>
                        <CTableRow>
                          <CTableDataCell>
                            <div>{index + 1}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.user.user_name_en}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.appointment.application_type}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.appointment.timeslot_date}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>
                              {item.appointment.timeslot_start_time}-{' '}
                              {item.appointment.timeslot_end_time}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>
                              <CButton
                                style={{ width: '100px' }}
                                color="light"
                                onClick={() => handleDetailsModel(item)}
                              >
                                Details
                              </CButton>
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>
                            {item.appointment.is_active ? (
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
                                    Closed
                                  </CButton>
                                }
                              </div>
                            )}
                          </CTableDataCell>
                        </CTableRow>
                      </React.Fragment>
                    ))}
                  </CTableBody>
                </CTable>
              </div>
            </div>
          </div>
        )}
        {isModalOpen && (
          <AppointmentDetailsModel
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            item={appointmentDetails}
          />
        )}
        <AppFooter />
      </div>
    </div>
  )
}

export default ConsultantAppointment

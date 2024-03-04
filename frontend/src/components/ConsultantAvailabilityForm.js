import React, { useState, useContext, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CSpinner,
  CToast,
  CToastBody,
  CToastClose,
} from '@coreui/react'

import { DEFAULT_URL } from 'src/utils/Constant'
import UserContext from 'src/utils/UserContext'
import axios from 'axios'

const ConsultantAvailabilityForm = () => {
  const [selectedDate, setSelectedDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [timeSlots, setTimeSlots] = useState([])
  const [alertVisible, setAlertVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useContext(UserContext)

  useEffect(() => {
    callTimeSlotApi()
  }, [])

  const callTimeSlotApi = async () => {
    try {
      const jwtToken = user.jwtToken
      const consultantId = user._id
      if (!consultantId) {
        setIsLoading(false)
        setErrorMessage('Login Required')
        setAlertVisible(true)
        return
      }
      const response = await axios.get(
        `${DEFAULT_URL}bookappointment/gettimeslot/${consultantId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )

      console.log(response.data.data)
      setTimeSlots(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddTimeSlot = () => {
    if (!selectedDate) {
      setErrorMessage('Please select a date.')
      return
    }

    const currentDate = new Date()
    if (selectedDate < currentDate) {
      setErrorMessage('Selected date cannot be in the past.')
      return
    }

    const currentTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes(),
    )
    const selectedTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      parseInt(startTime.split(':')[0]),
      parseInt(startTime.split(':')[1]),
    )

    if (selectedDate.getTime() === currentDate.getTime() && selectedTime < currentTime) {
      setErrorMessage('Selected time slot cannot be in the past.')
      setAlertVisible(true)
      return
    }

    if (!startTime || !endTime) {
      setErrorMessage('Please select start and end times.')
      setAlertVisible(true)
      return
    }

    if (startTime >= endTime) {
      setErrorMessage('End time must be greater than start time.')
      setAlertVisible(true)
      return
    }

    callAddTimeSlotApi()
  }

  const callAddTimeSlotApi = async () => {
    try {
      setIsLoading(true)
      const jwtToken = user.jwtToken

      console.log('jwtToken: ', jwtToken)
      console.log('user: ', selectedDate.toLocaleDateString(), startTime, endTime)

      let day = selectedDate.toLocaleDateString()
      let start_time = startTime
      let end_time = endTime
      let created_by = user?._id
      let updated_by = user?._id
      const response = await axios.post(
        DEFAULT_URL + 'bookappointment/addtimeslot',
        {
          day,
          start_time,
          end_time,
          created_by,
          updated_by,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )
      const successMessage = response.data.message
      setIsLoading(false)
      setErrorMessage(successMessage)
      setAlertVisible(true)
      setStartTime('')
      setEndTime('')
      setSelectedDate('')
      callTimeSlotApi()
    } catch (error) {
      setIsLoading(false)
      setAlertVisible(true)
      if (error.response) {
        setErrorMessage(error.response.data.message)
      } else if (error.request) {
        console.log('No response received:', error.request)
        setErrorMessage(error.request)
      } else {
        console.log('Error during request setup:', error.message)
        setErrorMessage(error.request)
      }
    }
  }

  return (
    <>
      <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
        <div className="position-fixed  start-50 end-50 translate-middle">
          {isLoading && <CSpinner />}
        </div>
        {isLoading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '90vh' }}
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

        <div>
          <form>
            <div className="row mb-3">
              <div className="col-sm-4 d-flex align-items-center">
                <label htmlFor="code" className="form-label me-3 text-center">
                  Select Date:
                </label>
                <div>
                  <DatePicker
                    className="form-control"
                    placeholderText="Select date"
                    selected={selectedDate}
                    minDate={new Date()}
                    onChange={(date) => setSelectedDate(date)}
                  />
                </div>
              </div>

              <div className="col-sm-4 d-flex align-items-center">
                <label htmlFor="code" className="form-label me-3 text-center">
                  Start Time:
                </label>
                <div>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="form-control"
                    style={{ width: '200px' }}
                  />
                </div>
              </div>

              <div className="col-sm-4 d-flex align-items-center">
                <label htmlFor="code" className="form-label me-3 text-center">
                  End Time:
                </label>
                <div>
                  <input
                    className="form-control"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    style={{ width: '200px' }}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3 d-flex justify-content-end">
              <button type="button" className="btn btn-primary" onClick={handleAddTimeSlot}>
                Add Time Slot
              </button>
            </div>
          </form>
        </div>
      </div>
      <div style={{ padding: '0 20px' }}>
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Start Time</CTableHeaderCell>
              <CTableHeaderCell>End Time</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {timeSlots.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>
                  <div>{index + 1}</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item.day}</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item.start_time}</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item.end_time}</div>
                </CTableDataCell>
                <CTableDataCell>
                  {item.is_available ? (
                    <div>
                      <div className="text-success">Available</div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-danger">Booked</div>
                    </div>
                  )}
                </CTableDataCell>
                <CTableDataCell>
                  <div>
                    {
                      <CButton style={{ width: '100px' }} color="danger">
                        Remove
                      </CButton>
                    }
                  </div>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </>
  )
}

export default ConsultantAvailabilityForm

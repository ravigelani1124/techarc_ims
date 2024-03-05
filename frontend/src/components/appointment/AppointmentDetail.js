import React, { useContext, useEffect, useState } from 'react'
import UserContext from 'src/utils/UserContext'
import axios from 'axios'
import { DEFAULT_URL } from 'src/utils/Constant'
import { CSpinner, CToast, CToastBody, CToastClose } from '@coreui/react'

const AppointmentDetail = ({ onNext }) => {
  const { user } = useContext(UserContext)
  const [selectedDate, setSelectedDate] = useState('')
  const [consultantList, setConsultantList] = useState([])
  const [servicesList, setServicesList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [timeSlots, setTimeSlots] = useState([])
  const [service, setService] = useState('')

  //set From selection data
  const [selectedConsultant, setSelectedConsultant] = useState({})
  const [selectedService, setSelectedService] = useState({})
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`${DEFAULT_URL}auth/getConsultantList`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.jwtToken}`,
          },
        })
        setConsultantList(response.data.data)
      } catch (error) {
        console.error('Error fetching consultant list:', error)
        setErrorMessage(error.message || 'An error occurred')
        setAlertVisible(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [user])

  const handleNext = (e) => {
    e.preventDefault()
    const data = {
      booking_details: {
        consultant_data: selectedConsultant,
        service_data: selectedService,
        timeslot_data: selectedTimeSlot,
      },
    }
    console.log('booking_details---', data)
    onNext(data)
  }

  const handleServiceChange = (e) => {
    setService(e.target.value)
    const selectedService = servicesList.find((service) => service._id === e.target.value)
    setSelectedService(selectedService)
  }

  const handleTimeSlotChange = (e) => {
    setSelectedDate(e.target.value)
    const selectedTimeSlot = timeSlots.find((timeSlot) => timeSlot._id === e.target.value)
    setSelectedTimeSlot(selectedTimeSlot)
  }
  
  const handleConsultantChange = async (e) => {
    setSelectedDate('')
    setServicesList([])
    setService('')
    setTimeSlots([])

    const selectedConsultantName = e.target.value
    const selectedConsultant = consultantList.find(
      (consultant) => consultant.consultant_name_en === selectedConsultantName,
    )

    setSelectedConsultant(selectedConsultant)
    if (selectedConsultant) {
      try {
        setIsLoading(true)
        const response = await axios.get(
          `${DEFAULT_URL}visatype/getvisatypesbyconsultant/${selectedConsultant._id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.jwtToken}`,
            },
          },
        )
        setServicesList(response.data.data)
        callTimeSlotApi(selectedConsultant._id)
      } catch (error) {
        console.error('Error fetching services:', error)
        setServicesList([])
        setErrorMessage(error.response?.data?.message || 'An error occurred')
        setAlertVisible(true)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const callTimeSlotApi = async (consultantId) => {
    try {
      if (!consultantId) {
        throw new Error('Consultant ID is required')
      }
      const response = await axios.get(
        `${DEFAULT_URL}bookappointment/gettimeslot/${consultantId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.jwtToken}`,
          },
        },
      )
      if (response.data.data === null || response.data.data.length === 0) {
        setErrorMessage('No time slots available')
        setAlertVisible(true)
        return
      }
      const availableSlots = response.data.data.filter((slot) => slot.is_available)
      setTimeSlots(availableSlots)
    } catch (error) {
      console.error('Error fetching consultant list:', error)
      setErrorMessage(error.message || 'An error occurred')
      setAlertVisible(true)
    }
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <div className="body flex-grow-1 px-3">
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
        <form onSubmit={handleNext}>
          <div className="mb-3">
            <label htmlFor="consultant" className="form-label">
              Consultant
            </label>
            <select
              id="consultant"
              className="form-select form-select-md"
              aria-label=".form-select-sm example"
              required
              onChange={handleConsultantChange}
            >
              <option value="" disabled selected>
                Select..
              </option>
              {consultantList.map((consultant) => (
                <option key={consultant._id} value={consultant.consultant_name_en}>
                  {consultant.consultant_name_en}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="servicesList" className="form-label">
              Services
            </label>
            <select
              id="servicesList"
              className="form-select form-select-md"
              aria-label=".form-select-sm example"
              required
              value={service}
              onChange={handleServiceChange}
            >
              <option value="" disabled>
                Select..
              </option>
              {servicesList.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.service_type_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="timeslot" className="form-label">
              Available Date and Time
            </label>
            <select
              id="timeslot"
              className="form-select form-select-md"
              aria-label=".form-select-sm example"
              required
              value={selectedDate}
              onChange={handleTimeSlotChange}
            >
              <option value="" disabled>
                Select..
              </option>
              {timeSlots.map((time) => (
                <option key={time._id} value={time._id}>
                  {time.day} {time.start_time} - {time.end_time}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary px-4">
            Next
          </button>
        </form>
      </div>
    </div>
  )
}

export default AppointmentDetail

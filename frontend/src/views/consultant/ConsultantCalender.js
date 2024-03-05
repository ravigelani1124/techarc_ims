import React, { useContext, useEffect, useState } from 'react'
import { DEFAULT_URL } from 'src/utils/Constant'
import UserContext from 'src/utils/UserContext'
import axios from 'axios'
import { AppSidebar, AppFooter, AppHeader } from 'src/components'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

const ConsultantCalender = () => {
  const { user } = useContext(UserContext)
  const [appointments, setAppointments] = useState([])

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
      const filter = response.data.data.filter((item) => item.is_available)
      setAppointments(filter)
    } catch (error) {
      console.log(error)
    }
  }

  const [events, setEvents] = useState([
    {
      title: 'Appointment 1',
      start: new Date(2024, 2, 10, 10, 0), // Year, Month (0 indexed), Day, Hour, Minute
      end: new Date(2024, 2, 10, 11, 0),
    },
    {
      title: 'Appointment 2',
      start: new Date(2024, 2, 12, 14, 0),
      end: new Date(2024, 2, 12, 15, 0),
    },
  ])

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />

        <div className="body flex-grow-1 px-3">
          <div className="mb-4">
            <h4>
              <center>Calendar</center>
            </h4>
            <div style={{ height: '500px' }}>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ margin: '50px' }}
              />
            </div>
          </div>
        </div>

        <AppFooter />
      </div>
    </>
  )
}

export default ConsultantCalender

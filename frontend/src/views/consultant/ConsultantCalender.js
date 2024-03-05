import React, { useContext, useEffect, useState } from 'react'
import { DEFAULT_URL } from 'src/utils/Constant'
import UserContext from 'src/utils/UserContext'
import axios from 'axios'
import { AppSidebar, AppFooter, AppHeader } from 'src/components'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

const ConsultantCalender = () => {
  const { user } = useContext(UserContext)
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    callTimeSlotApi()
  }, [user])

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

      const convertedEvents = convertArrayToEvents(filter)
      console.log(convertedEvents)
      setAppointments(convertedEvents)
    } catch (error) {
      console.log(error)
    }
  }

  function convertArrayToEvents(arr) {
    return arr.map((item) => {
      // Extract day, start_time, and end_time from the item
      const { day, start_time, end_time } = item

      // Split start_time and end_time to hours and minutes
      const [startHour, startMinute] = start_time.split(':').map(Number)
      const [endHour, endMinute] = end_time.split(':').map(Number)

      // Convert day string to a Date object
      const selectedDate = new Date(day)

      // Create new Date objects for start and end times
      const startDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        startHour,
        startMinute,
      )

      const endDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        endHour,
        endMinute,
      )

      // Return an object with title, start, and end properties
      return {
        title: "Test Appointment",
        start: startDate,
        end: endDate,
      }
    })
  }

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
                events={appointments}
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

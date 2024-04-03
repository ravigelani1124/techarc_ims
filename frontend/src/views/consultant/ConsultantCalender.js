import React, { useContext, useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import { AppSidebar, AppFooter, AppHeader } from 'src/components';
import { DEFAULT_URL } from 'src/utils/Constant';
import UserContext from 'src/utils/UserContext';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const ConsultantCalender = () => {
  const localizer = momentLocalizer(moment);
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    getAppointments();
  }, [user]);

  const getAppointments = async () => {
    try {
      setIsLoading(true);
      const jwtToken = user.jwtToken;
      const response = await axios.get(`${DEFAULT_URL}appointments/getappointmentByConsultant/${user._id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const filteredAppointments = response.data.data.filter((item) => item.appointment.is_active === true);
      const convertedEvents = convertArrayToEvents(filteredAppointments);
      setAppointments(convertedEvents);
    } catch (error) {
      console.log(error);
      setErrorMessage('Error fetching appointments');
      setAlertVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  function convertArrayToEvents(arr) {
    return arr.map(({ appointment }) => {
      const { user_name, application_type, appsub_type, timeslot_date, timeslot_end_time, timeslot_start_time } = appointment;
      const [startHour, startMinute] = timeslot_start_time.split(':').map(Number);
      const [endHour, endMinute] = timeslot_end_time.split(':').map(Number);      
      const [day, month, year] = timeslot_date.split('/').map(Number);      
      const startDate = new Date(year, month - 1, day, startHour, startMinute);
      const endDate = new Date(year, month - 1, day, endHour, endMinute);
        
      return {
        title: `${user_name} - ${application_type} : (${appsub_type})`,
        start: startDate,
        end: endDate,
      };
    });
  }
  

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />

        <div className="body flex-grow-1 px-3">
          <div className="mb-4">
            <h4 className="text-center">Calendar</h4>
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
  );
};

export default ConsultantCalender;

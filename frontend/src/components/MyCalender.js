import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
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
  ]);

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '50px' }}
      />
    </div>
  );
};

export default MyCalendar;

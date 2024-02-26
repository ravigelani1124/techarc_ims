import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ConsultantAvailabilityForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [error, setError] = useState('');

  const handleAddTimeSlot = () => {
    if (!selectedDate) {
      setError('Please select a date.');
      return;
    }

    const currentDate = new Date();
    if (selectedDate < currentDate) {
      setError('Selected date cannot be in the past.');
      return;
    }

    const currentTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes());
    const selectedTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1]));

    if (selectedDate.getTime() === currentDate.getTime() && selectedTime < currentTime) {
      setError('Selected time slot cannot be in the past.');
      return;
    }

    if (!startTime || !endTime) {
      setError('Please select start and end times.');
      return;
    }

    if (startTime >= endTime) {
      setError('End time must be greater than start time.');
      return;
    }

    const newTimeSlot = {
      date: selectedDate.toLocaleDateString(),
      startTime,
      endTime
    };

    setTimeSlots([...timeSlots, newTimeSlot]);
    setStartTime('');
    setEndTime('');
    setError('');
  };

  return (
    <>
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <div style={{ marginBottom: '10px' }}>
        <label>Select Date: </label>
        <DatePicker selected={selectedDate} minDate={new Date()} onChange={date => setSelectedDate(date)} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Start Time: </label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <label>End Time: </label>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        <button onClick={handleAddTimeSlot} style={{ marginLeft: '10px' }}>Add Time Slot</button>
      </div>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <div>
        <h3>Time Slots</h3>
        <ul>
          {timeSlots.map((slot, index) => (
            <li key={index}>
              Date: {slot.date}, Start Time: {slot.startTime}, End Time: {slot.endTime}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default ConsultantAvailabilityForm;

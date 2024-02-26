import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

function ConsultantAvailabilityForm() {
  const [selectedDays, setSelectedDays] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const handleDayChange = (date) => {
    setStartDate(date);
  };

  const handleAddTimeSlot = () => {
    // Add your validation logic here if needed
    setTimeSlots([...timeSlots, { day: startDate, startTime: '00:00', endTime: '00:00' }]);
  };

  const handleTimeSlotChange = (index, field, value) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index][field] = value;
    setTimeSlots(updatedTimeSlots);
  };

  const handleRemoveTimeSlot = (index) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots.splice(index, 1);
    setTimeSlots(updatedTimeSlots);
  };

  return (
    <div>
      <h2>Consultant Availability</h2>
      <div>
        <label>Select Date:</label>
        <DatePicker selected={startDate} onChange={handleDayChange} />
      </div>
      <button onClick={handleAddTimeSlot}>Add Time Slot</button>
      {timeSlots.map((timeSlot, index) => (
        <div key={index}>
          <h3>{timeSlot.day.toDateString()}</h3>
          <label>Start Time:</label>
          <TimePicker
            value={timeSlot.startTime}
            onChange={(value) => handleTimeSlotChange(index, 'startTime', value)}
          />
          <label>End Time:</label>
          <TimePicker
            value={timeSlot.endTime}
            onChange={(value) => handleTimeSlotChange(index, 'endTime', value)}
          />
          <button onClick={() => handleRemoveTimeSlot(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default ConsultantAvailabilityForm;

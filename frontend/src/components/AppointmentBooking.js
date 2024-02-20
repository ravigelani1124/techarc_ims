import React, { useEffect, useState } from 'react';

const AppointmentBooking = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [applicationType, setApplicationType] = useState([]);
  const [applications, setApplications] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement booking logic here
    console.log('Appointment booked:', { name, email, selectedDate, selectedTime });
  };

  const data = [
    {
      _id: 1,
      application_name_en: 'Study Permit'      
    },
    {
      _id: 2,
      application_name_en: 'Open Express entry'
    },
    {
      _id: 3,
      application_name_en: 'PR Application'
    }
  ]

  useEffect(() => {
    setApplications(data)
  },[data])

  
  return (
    <div>
      
      <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="organizationName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="organizationName"
                name="org_name_en"
                placeholder="Name"
                pattern="[A-Za-z\s\-]+"
                required
                autoFocus                              
              />
            </div>
            <div className="mb-3">
              <label htmlFor="code" className="form-label">
                Select Application
              </label>
              <select
                className="form-select form-select-md"
                aria-label=".form-select-sm example"
                required
                value={applications}                  
                onChange={(e) => setApplicationType(e.target.value)}              
              >
                <option value="" disabled selected>
                  Select application..
                </option>
                {applicationType.map((application) => (
                  <option key={application._id} value={application._id}>
                    {application.application_name_en}
                  </option>
                ))}
              </select>
            </div>
            </form>
    </div>
  );
};

export default AppointmentBooking;

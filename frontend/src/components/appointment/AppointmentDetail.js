import React, { useContext, useEffect, useState } from 'react'

const AppointmentDetail = () => {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [applicationType, setApplicationType] = useState([])
  const [applications, setApplications] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Implement booking logic here
    console.log('Appointment booked:', { name, email, selectedDate, selectedTime })
  }

  const data = [
    {
      _id: 1,
      application_name_en: 'Study Permit',
    },
    {
      _id: 2,
      application_name_en: 'Open Express entry',
    },
    {
      _id: 3,
      application_name_en: 'PR Application',
    },
  ]
  return (
    <div>
      <div className="body flex-grow-1 px-3">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="code" className="form-label">
                Application Type
              </label>
              <select
                className="form-select form-select-md"
                aria-label=".form-select-sm example"
                required
                value={applications}
                onChange={(e) => setApplicationType(e.target.value)}
              >
                <option value="" disabled selected>
                  Select..
                </option>
                {applicationType.map((application) => (
                  <option key={application._id} value={application._id}>
                    {application.application_name_en}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="code" className="form-label">
                Consultant
              </label>
              <select
                className="form-select form-select-md"
                aria-label=".form-select-sm example"
                required
                value={applications}
                onChange={(e) => setApplicationType(e.target.value)}
              >
                <option value="" disabled selected>
                  Select..
                </option>
                {applicationType.map((application) => (
                  <option key={application._id} value={application._id}>
                    {application.application_name_en}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="code" className="form-label">
                Available Date and Time
              </label>
              <select
                className="form-select form-select-md"
                aria-label=".form-select-sm example"
                required
                value={applications}
                onChange={(e) => setApplicationType(e.target.value)}
              >
                <option value="" disabled selected>
                  Select..
                </option>
                {applicationType.map((application) => (
                  <option key={application._id} value={application._id}>
                    {application.application_name_en}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 d-flex justify-content-end">
              {/* <button type="submit" className="btn btn-primary px-4">
                Book Appointment
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AppointmentDetail

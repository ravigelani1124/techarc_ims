import React, { useContext, useEffect, useState } from 'react';
import UserContext from 'src/utils/UserContext';
import axios from 'axios';
import { DEFAULT_URL } from 'src/utils/Constant';
import { CSpinner } from '@coreui/react';

const AppointmentDetail = () => {
  const { user } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultantList, setConsultantList] = useState([]);
  const [applicationType, setApplicationType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [consultant, setConsultant] = useState('');
  const [consultantId, setConsultantId] = useState('');

  useEffect(() => {
    getConsultantList();
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement booking logic here
    console.log('Appointment booked:', { name, email, selectedDate, selectedTime });
  }

  const handleConsultantChange = async (e) => {
    const selectedConsultantName = e.target.value;
    const selectedConsultant = consultantList.find((consultant) => consultant.consultant_name_en === selectedConsultantName);
  
    console.log("Selected Consultant:", selectedConsultant);
    if (selectedConsultant) {
      setConsultantId(selectedConsultant._id);
      setConsultant(selectedConsultantName);
      
      try {
        setIsLoading(true);
        const response = await axios.get(`${DEFAULT_URL}visatype/getvisatypesbyconsultant/${selectedConsultant._id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.jwtToken}`,
          },
        });
        setApplicationType(response.data.data);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage(error.response?.data?.message || 'An error occurred');
        setAlertVisible(true);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const getConsultantList = async () => {
    try {
      setIsLoading(true);
      const token = user?.jwtToken;
      const response = await axios.get(`${DEFAULT_URL}auth/getConsultantList`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Consultant List:', response.data.data);
      setConsultantList(response.data.data);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred');
      setAlertVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="body flex-grow-1 px-3">
        <div>
          {isLoading && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: '100vh' }}
            >
              <CSpinner />
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="consultant" className="form-label">
                Consultant
              </label>
              <select
                id="consultant"
                className="form-select form-select-md"
                aria-label=".form-select-sm example"
                required
                value={consultant}
                onChange={handleConsultantChange}
              >
                <option value="" disabled>Select..</option>
                {consultantList.map((consultant) => (
                  <option key={consultant._id} value={consultant.consultant_name_en}>
                    {consultant.consultant_name_en}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="applicationType" className="form-label">
                Application Type
              </label>
              <select
                id="applicationType"
                className="form-select form-select-md"
                aria-label=".form-select-sm example"
                required
                value={applicationType}
                onChange={(e) => setApplications(e.target.value)}
              >
                <option value="" disabled>Select..</option>
                {applicationType.map((application) => (
                  <option key={application._id} value={application._id}>
                    {application.visa_type_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="availableDateTime" className="form-label">
                Available Date and Time
              </label>
              <select
                id="availableDateTime"
                className="form-select form-select-md"
                aria-label=".form-select-sm example"
                required
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                {/* Add options for available dates and times */}
              </select>
            </div>
            <div className="mb-3 d-flex justify-content-end">
              {/* Add booking button */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetail;

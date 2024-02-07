import React, { useState, useContext } from 'react';
import UserContext from 'src/utils/UserContext';
import axios from 'axios';

const ConsultancyForm = ({ onClose, updateConsultancies }) => {
  const { user } = useContext(UserContext);
  const [consultancyName, setConsultancyName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await callAddConsultancyAPI();
  };

  const callAddConsultancyAPI = async () => {
    try {
      const jwtToken = user.jwtToken;
      const response = await axios.post(
        'http://localhost:3000/api/consultancy/addConsultancy',
        {
          consultancyName: consultancyName,
          licenseNumber: licenseNumber,
          superuserId: user._id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
          }
        }
      );

      const successMessage = response.data.message;
      alert("Success: " + successMessage);
      onClose(); // Close the form
      updateConsultancies(); // Update consultancies list in the parent component
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.message);
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert(error.request);
      } else {
        alert(error.request);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="consultancyName" className="form-label">
            Consultancy Name
          </label>
          <input
            type="text"
            className="form-control"
            id="consultancyName"
            name="consultancyName"
            placeholder='Prime Time Consultancy'
            value={consultancyName}
            onChange={(e) => setConsultancyName(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-3">
          <label htmlFor="licenseNumber" className="form-label">
            License Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="licenseNumber"
            name="licenseNumber"
            placeholder='11220054'
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            required
            autoFocus
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ConsultancyForm;

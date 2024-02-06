import React, { useState } from 'react';

const ConsultancyForm = ({ onClose }) => {
  const [consultancyName, setConsultancyName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'consultancyName') {
      setConsultancyName(value);
    } 
    else if (name === 'licenseNumber') {
      setLicenseNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(`Submitted consultancy: ${consultancyName} with license number: ${licenseNumber}`);

    // Reset form fields
    setConsultancyName('');
    setLicenseNumber('');
    
    onClose();
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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

import React from 'react';

const PhoneTypeDropdown = ({ selectedPhoneType, handlePhoneTypeChange }) => {
  const phoneTypes = ['Home', 'Work', 'Mobile'];

  return (
    <div className="mb-3">
      <label htmlFor="phoneType" className="form-label">
        Phone Type
      </label>
      <select
        className="form-select form-select-md"
        id="phoneType"
        aria-label="Phone Type"
        value={selectedPhoneType}
        onChange={handlePhoneTypeChange}
      >
        <option value="" disabled>Select..</option>
        {phoneTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PhoneTypeDropdown;

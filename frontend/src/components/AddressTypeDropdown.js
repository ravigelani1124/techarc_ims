import React from 'react';

const AddressTypeDropdown = ({  selectedAddressType, handleAddressTypeChange }) => {
  const addressTypes = ['Home', 'Work'];
    
  return (
    <div className="mb-3">
      <label htmlFor="addressType" className="form-label">
        Select Address Type
      </label>
      <select
        className="form-select form-select-md"
        id="addressType"
        aria-label="Address Type"
        value={selectedAddressType}
        onChange={handleAddressTypeChange}
      >
        <option value="" disabled>Select address type..</option>
        {addressTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddressTypeDropdown;


import React from 'react'

const AddressTypeDropdown = ({ selectedAddressType, handleAddressTypeChange }) => {
  const addressTypes = ['Home', 'Work']

  return (
    <div className="mb-3">
      <label htmlFor="addressType" className="form-label">
        Address Type
      </label>
      <select
        className="form-select form-select-md"
        id="addressType"
        aria-label=".form-select-sm example"
        value={selectedAddressType}
        onChange={handleAddressTypeChange}
      >
        <option value="" disabled selected>
          Select..
        </option>
        {addressTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  )
}

export default AddressTypeDropdown

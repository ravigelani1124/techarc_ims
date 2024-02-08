import React, { useState } from 'react';
import { CFormSelect } from '@coreui/react';

const SpinnerComponent = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    // Any additional logic you want to execute when the selection changes
  };

  return (
    <CFormSelect
      size="lg"
      className="mb-3"
      aria-label="Default select example"
      value={selectedOption}
      onChange={handleSelectChange}
    >
      <option>Select an option</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </CFormSelect>
  );
};

export default SpinnerComponent;

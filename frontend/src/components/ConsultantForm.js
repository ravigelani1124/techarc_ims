import React, { useEffect, useState, useContext } from 'react'
import { CFormInput, CFormLabel, CFormSelect } from '@coreui/react'
import UserContext from 'src/utils/UserContext';
import axios from 'axios';
import { DEFAULT_URL } from 'src/utils/Constant';
import { doc } from 'prettier';


const ConsultancyForm = ({ onClose,updateConsultant,consultancies }) => {
  
  const { user } = useContext(UserContext);
  const [selectedConsultancy, setSelectedConsultancy] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');

  console.log("Consultancies----In form",consultancies)
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    await callAddConsultantAPI();
  }
  const handleConsultancyChange = (e) => {
    setSelectedConsultancy(e.target.value);
    console.log("selectedConsultancy",e.target.value)
    // Any additional logic you want to execute when the consultancy selection changes
  };

  const callAddConsultantAPI = async () => {
    try {
      console.log("name", name);
      console.log("email", email);
      console.log("phone", phone);  
      console.log("licenseNumber", licenseNumber);
      console.log("selectedConsultancy", selectedConsultancy);
      console.log("user.jwtToken", user.jwtToken);
  
      const jwtToken = user.jwtToken;
      const response = await axios.post(
        DEFAULT_URL+'auth/consultantSignup',
        {
          name: name, // Ensure that all required fields are included in the request payload
          superuserId: user._id,
          consultancyName: selectedConsultancy.consultancyName,
          cosultancyId: selectedConsultancy._id,
          email: email,
          licenseNumber: licenseNumber,
          contactNumber: phone,                    
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
      updateConsultant();
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
  }
  


  return (
    <div style={{ padding: '0 20px' }}>
      <form onSubmit={handleSubmit}>
        
      <div className="mb-3">
          <CFormLabel htmlFor="consultantInput">Consultant Name</CFormLabel>
          <CFormInput
            type="text"
            id="consultantInput"
            placeholder="John Doe"
            required
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="emailInput">Email address</CFormLabel>
          <CFormInput
            type="email"
            id="emailInput"
            placeholder="name@example.com"
            required
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
        
        <div className="mb-3">
          <CFormLabel htmlFor="consultancyInput">Consultancy</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            id="consultancyInput"
            value={selectedConsultancy}
            onChange={handleConsultancyChange}
          >            
            <option value="">Select</option>
            {consultancies &&
              consultancies.map((consultancy) => (
                <option key={consultancy._id} value={consultancy.consultancyName}>
                  {consultancy.consultancyName}
                </option>
              ))}
          </CFormSelect>
        </div>
      
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="licInput">License Number</CFormLabel>
          <CFormInput type="tel" id="licInput" placeholder="11220054" required autoFocus onChange={(e) => setLicenseNumber(e.target.value)} />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="contactInput">Contact Number</CFormLabel>
          <CFormInput
            type="tel"
            id="contactInput"
            placeholder="123-456-7890"
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            required
            autoFocus
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        
        <div className="mb-3 d-flex justify-content-end">
          <button type="submit" className="btn btn-primary px-4">
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default ConsultancyForm

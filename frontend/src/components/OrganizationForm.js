import React, { useState, useContext } from 'react';
import { AppSidebar, AppFooter, AppHeader } from './index';
import UserContext from 'src/utils/UserContext';
import axios from 'axios';
import { DEFAULT_URL } from 'src/utils/Constant';
import { CFormInput, CFormLabel, CFormSelect, CSpinner,CToast,CToastBody,CToastClose } from '@coreui/react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { CRow, CCol } from '@coreui/react';

const OrganizationForm = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    org_code: '',
    org_name_en: '',
    org_name_fr: '',
    org_email: '',
    org_phone: '',
    street_no: '',
    street_name: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCountryChange = (val) => {
    setFormData({ ...formData, country: val });
  };

  const handleRegionChange = (val) => {
    setFormData({ ...formData, state: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addOrganizationAPIs();
  };

  const addOrganizationAPIs = async () => {
    try {
      const jwtToken = user.jwtToken;
      const response = await axios.post(
        `${DEFAULT_URL}organization/addorganization`,
        {
          ...formData,
          created_by: user._id,
          updated_by: user._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setLoading(false);
      const successMessage = response.data.message;        
      setErrorMessage(successMessage);
    setFormData({
      org_code: '',
      org_name_en: '',
      org_name_fr: '',
      org_email: '',
      org_phone: '',
      street_no: '',
      street_name: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    })
    } catch (error) {  
      setLoading(false);
      console.error('ErrorEmpty:', error);    
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error:', error);
        setErrorMessage(error.response.data.message + ' || ' + "Validation failed");
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        setErrorMessage(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
        setErrorMessage(error.message);        
      }
    }
    setAlertVisible(true)
  };

  return (
    <>
      <AppSidebar />
      <div className="position-fixed top-50 start-50 end-50 translate-middle" > {loading && <CSpinner/>}</div>
      {alertVisible && (
          <div
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: '9999', // Ensure it's above other content
            }}
          >
            <CToast
              autohide={false}
              visible={true}
              color="primary"
              className="text-white align-items-center"
            >
              <div className="d-flex">
                <CToastBody>{errorMessage}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
              </div>
            </CToast>
          </div>
        )}
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div style={{ padding: '0 20px' }}>                
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
                placeholder="Organization Name"
                pattern="[A-Za-z\s\-]+"
                required
                autoFocus
                onChange={handleChange}
                value={formData.org_name_en}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="code" className="form-label">
                Code
              </label>
              <input
                type="tel"
                className="form-control"
                id="code"
                name="org_code"
                placeholder="ORG234"
                pattern="[A-Za-z0-9]{1,5}"
                required
                onChange={handleChange}
                value={formData.org_code}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="org_email"
                placeholder="abc@example.com"
                required
                onChange={handleChange}
                value={formData.org_email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="org_phone"
                placeholder="647-273-5676"
                pattern="[0-9]{10}"
                required
                onChange={handleChange}
                value={formData.org_phone}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="streetNo" className="form-label">
                Street No.
              </label>
              <input
                type="tel"
                className="form-control"
                id="streetNo"
                name="street_no"
                placeholder="52"
                pattern="[0-9]+"
                required
                onChange={handleChange}
                value={formData.street_no}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="tel"
                className="form-control"
                id="address"
                name="street_name"
                placeholder="Queen street"
                pattern="[A-Za-z\s\-]+"
                required
                onChange={handleChange}
                value={formData.street_name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                placeholder="Toronto"
                pattern="[A-Za-z\s\-]+"
                required
                onChange={handleChange}
                value={formData.city}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="country">Country & Region</CFormLabel>
              <CRow>
                <CCol xs="6">
                  <CountryDropdown
                    className="form-control"
                    value={formData.country}
                    onChange={handleCountryChange}
                  />
                </CCol>
                <CCol xs="6">
                  <RegionDropdown
                    className="form-control"
                    country={formData.country}
                    value={formData.state}
                    onChange={handleRegionChange}
                  />
                </CCol>
              </CRow>
            </div>
            <div className="mb-3">
              <label htmlFor="zip" className="form-label">
                Postal Code
              </label>
              <input
                type="text"
                className="form-control"
                id="zip"
                name="zip"
                placeholder="M3N 1L6"
                pattern="[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d"
                required
                onChange={handleChange}
                value={formData.zip}
              />
            </div>

            <div className="mb-3 d-flex justify-content-end">
              <button type="submit" className="btn btn-primary px-4">
                Submit
              </button>
            </div>
          </form>
        </div>
        <AppFooter />
      </div>
    </>
  );
};

export default OrganizationForm;

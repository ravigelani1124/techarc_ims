import React, { useEffect, useState, useContext } from 'react';
import { AppSidebar, AppFooter, AppHeader } from './index';
import UserContext from 'src/utils/UserContext';
import axios from 'axios';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { CFormLabel, CSpinner, CToast, CToastBody, CToastClose } from '@coreui/react';
import { CRow, CCol } from '@coreui/react';
import { DEFAULT_URL } from 'src/utils/Constant';
import AddressTypeDropdown from './AddressTypeDropdown'
import PhoneTypeDropdown from './PhoneTypeDropdown'


const ConsultantForm = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orgs, setOrgs] = useState([]);
  const [addressType, setAddressType] = useState('')
  const [phoneType, setPhoneType] = useState('')
  const [selectedOrg, setSelectedOrg] = useState('');
  const [formData, setFormData] = useState({
    consultant_code: '',
    consultant_name_en: '',
    consultant_license_number: '',
    consultant_phone: '',
    consultant_email: '',
    org_name_en: '',
    org_id: '',
    phone_type: '',
    address_type: '',
    street_no: '',
    street_name: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    created_by: '',
    updated_by: '',
  });

  useEffect(() => {
    document.title = 'Admin | Add Consultant';
    getOrganizations();
  }, []);

  
  const getOrganizations = async () => {
    setLoading(true);
    try {
      const jwtToken = user.jwtToken;
      const res = await axios.get(`${DEFAULT_URL}organization/getOrganizations`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      const organization = res.data.data
      const activeOrganizations = organization.filter(
        (org) => org.record_status === true
      )
      setLoading(false);
      setErrorMessage(res.data.message);
      setAlertVisible(true);
      setOrgs(activeOrganizations);
    } catch (err) {
      setLoading(false);
      setErrorMessage(err);
    }
  };

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
    console.log("consultant form---",formData);
    await addConsultantAPIs();
  };

  const addConsultantAPIs = async () => {
    try {
      const jwtToken = user.jwtToken;
      const response = await axios.post(
        `${DEFAULT_URL}auth/consultantSignup`,
        {
          ...formData,
          org_id: selectedOrg,
          address_type: addressType,
          phone_type: phoneType,
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
      resetForm();
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setErrorMessage(error.response.data.message + ' || ' + 'Validation failed');
      } else if (error.request) {
        setErrorMessage(error.request);
      } else {
        setErrorMessage(error.message);
      }
    }
    setAlertVisible(true);
  };

  const resetForm = () => {
    setFormData({
      consultant_code: '',
      consultant_name_en: '',
      consultant_license_number: '',
      consultant_phone: '',
      consultant_email: '',
      org_name_en: '',
      org_id: '',
      street_no: '',
      street_name: '',
      phone_type: '',
      address_type: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      created_by: '',
      updated_by: '',
    });
  };

  const handleOrgChange = (e) => {  
    setSelectedOrg(e.target.value);  
    
    const orgName = orgs.find(org => org._id === e.target.value)?.org_name_en || '';
    setFormData({ ...formData, org_name_en: orgName });
  };

  return (
    <>
      <AppSidebar />
      <div className="position-fixed top-50 start-50 end-50 translate-middle">{loading && <CSpinner />}</div>
      {alertVisible && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: '9999' }}>
          <CToast autohide={false} visible={true} color="primary" onClose={() => setAlertVisible(false)} className="text-white align-items-center">
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
              <label htmlFor="consultantName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="consultantName"
                name="consultant_name_en"
                placeholder="Consultant Name"
                pattern="[A-Za-z\s\-]+"
                required
                autoFocus
                value={formData.consultant_name_en}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="code" className="form-label">
                Code
              </label>
              <input
                type="text"
                className="form-control"
                id="code"
                name="consultant_code"
                placeholder="CON234"
                pattern="[A-Za-z0-9]{1,6}"
                required
                value={formData.consultant_code}
                onChange={handleChange}
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
                name="consultant_license_number"
                placeholder="lic2345680"
                pattern="[A-Za-z0-9]{1,10}"
                required
                value={formData.consultant_license_number}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="code" className="form-label">
                Select Organization
              </label>
              <select
                className="form-select form-select-md"
                aria-label=".form-select-sm example"
                required
                value={selectedOrg}
                onChange={handleOrgChange}
              >
                <option value="" disabled selected>
                  Select orgs..
                </option>
                {orgs.map((org) => (
                  <option key={org._id} value={org._id}>
                    {org.org_name_en}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="consultant_email"
                placeholder="abc@example.com"
                required
                value={formData.consultant_email}
                onChange={handleChange}
              />
            </div>
            <PhoneTypeDropdown
              selectedPhoneType={phoneType}
              handlePhoneTypeChange={(e) => setPhoneType(e.target.value)}
            />
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="consultant_phone"
                placeholder="647-273-5676"
                pattern="[0-9]{10}"
                required
                value={formData.consultant_phone}
                onChange={handleChange}
              />
            </div>
            <AddressTypeDropdown
              selectedAddressType={addressType}
              handleAddressTypeChange={(e) => setAddressType(e.target.value)}
            />

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
                value={formData.street_no}
                onChange={handleChange}
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
                value={formData.street_name}
                onChange={handleChange}
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
                value={formData.city}
                onChange={handleChange}
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
                value={formData.zip}
                onChange={handleChange}
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

export default ConsultantForm;

import React, { useEffect, useState, useContext } from 'react'
import { AppSidebar, AppFooter, AppHeader } from './index'
import UserContext from 'src/utils/UserContext'
import axios from 'axios'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import { CFormLabel, CSpinner, CToast, CToastBody, CToastClose } from '@coreui/react'
import { CRow, CCol } from '@coreui/react'
import { DEFAULT_URL } from 'src/utils/Constant'

const AddUserForm = () => {
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    user_code: '',
    user_name_en: '',
    user_email: '',
    user_phone: '',
    consultant_id: '',
    consultant_name_en: '',
    street_no: '',
    street_name: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    created_by: '',
    updated_by: '',
  })

  useEffect(() => {
    document.title = 'Add User'
  }, [])

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
    e.preventDefault()
    setLoading(true)
    await addUserAPIs()
    //console.log('Add User---', formData)
  }

  const addUserAPIs = async () => {
    try {
      const token = user.jwtToken
      if (!token) {
        throw new Error('Login Required')
      }
      console.log('Add User---', formData)
      const response = await axios.post(DEFAULT_URL + 'auth/usersignup', 
      {
        ...formData,
          consultant_id: user._id,
          consultant_name_en: user.consultant_name_en,
          created_by: user._id,
          updated_by: user._id,
      },
      {
        
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      setErrorMessage(response.data.message)
      setAlertVisible(true)
      setLoading(false)
      clearForm()
    } catch (error) {
     // clearForm()     
      setLoading(false);
      if (error.response) {
        setErrorMessage(error.response.data.message + ' || ' + 'Validation failed');
      } else if (error.request) {
        setErrorMessage(error.request);
      } else {
        setErrorMessage(error.message);
      }
      setAlertVisible(true);
    }
  }

  const clearForm = () => {
    setFormData({
      user_code: '',
      user_name_en: '',
      user_email: '',
      user_phone: '',
      consultant_id: '',
      consultant_name_en: '',
      street_no: '',
      street_name: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      created_by: '',
      updated_by: '',
    })
  }

  return (
    <>
      <AppSidebar />
      <div className="position-fixed top-50 start-50 end-50 translate-middle">
        {loading && <CSpinner />}
      </div>
      {alertVisible && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: '9999' }}>
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
              <label htmlFor="code" className="form-label">
                Code
              </label>
              <input
                type="text"
                className="form-control"
                id="code"
                name="user_code"
                placeholder="CON234"
                pattern="[A-Za-z0-9]{1,6}"
                required
                value={formData.user_code}
                onChange={handleChange}
              />
            </div>

          <div className="mb-3">
              <label htmlFor="userName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="userName"
                name="user_name_en"
                placeholder="User Name"
                pattern="[A-Za-z\s\-]+"
                required
                autoFocus
                value={formData.user_name_en}
                onChange={handleChange}
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
                name="user_email"
                placeholder="abc@example.com"
                required
                value={formData.user_email}
                onChange={handleChange}
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
                name="user_phone"
                placeholder="647-273-5676"
                pattern="[0-9]{10}"
                required
                value={formData.user_phone}
                onChange={handleChange}
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
  )
}

export default AddUserForm

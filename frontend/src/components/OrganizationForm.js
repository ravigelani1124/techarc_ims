import React, { useState, useContext } from 'react'
import { AppSidebar, AppFooter, AppHeader } from './index'
import UserContext from 'src/utils/UserContext'
import axios from 'axios'
import { DEFAULT_URL } from 'src/utils/Constant'
import { CFormInput, CFormLabel, CFormSelect } from '@coreui/react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import { CRow, CCol } from '@coreui/react'

const OrganizationForm = ({ onClose, updateConsultancies }) => {
  const { user } = useContext(UserContext)
  const [consultancyName, setConsultancyName] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')



  const handleSubmit = async (e) => {
    e.preventDefault()
    await callAddConsultancyAPI()
  }

  const callAddConsultancyAPI = async () => {
    try {
      const jwtToken = user.jwtToken
      const response = await axios.post(
        DEFAULT_URL + 'consultancy/addConsultancy',
        {
          consultancyName: consultancyName,
          licenseNumber: licenseNumber,
          superuserId: user._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )

      const successMessage = response.data.message
      alert('Success: ' + successMessage)
      onClose() // Close the form
      updateConsultancies() // Update consultancies list in the parent component
    } catch (error) {
      console.error(error)
      if (error.response) {
        alert(error.response.data.message)
      } else if (error.request) {
        console.error('No response received:', error.request)
        alert(error.request)
      } else {
        alert(error.request)
      }
    }
  }

  return (
    <>
      <AppSidebar />
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
                name="organizationName"
                placeholder="Organization Name"
                pattern="[A-Za-z\s\-]+"
                required
                autoFocus
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
                name="code"
                placeholder="ORG234"
                pattern="[A-Za-z0-9]{1,6}"
                required
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
                name="email"
                placeholder="abc@example.com"
                required
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
                name="phone"
                placeholder="647-273-5676"
                pattern="[0-9]{10}"
                required
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
                name="streetNo"
                placeholder="52"
                pattern="[0-9]+"
                required
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
                name="address"
                placeholder="Channing Place"
                pattern="[A-Za-z\s\-]+"
                required
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
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="country">Country & Region</CFormLabel>
              <CRow>
                <CCol xs="6">
                  <CountryDropdown
                    className="form-control"
                    value={country}
                    onChange={(val) => setCountry(val)}
                  />
                </CCol>
                <CCol xs="6">
                  <RegionDropdown
                    className="form-control"
                    country={country}
                    value={region}
                    onChange={(val) => setRegion(val)}
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

export default OrganizationForm
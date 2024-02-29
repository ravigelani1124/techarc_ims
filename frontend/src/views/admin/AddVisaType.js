import { AppSidebar, AppFooter, AppHeader } from '../../components/index'
import UserContext from 'src/utils/UserContext'
import { useNavigate } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import { CFormLabel, CSpinner, CToast, CToastBody, CToastClose } from '@coreui/react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'

const AddVisaType = () => {
  const [loading, setLoading] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    visa_type_name: '',
    country: '',
    visa_fee: 0,
    created_by: '',
    updated_by: '',
  })

  useEffect(() => {
    document.title = 'Add Visa Type'
  }, [])

  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCountryChange = (val) => {
    setFormData({ ...formData, country: val })
  }

  return (
    <div>
      <AppSidebar />
      <div className="position-fixed top-50 start-50 end-50 translate-middle">
        {' '}
        {loading && <CSpinner />}
      </div>
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
        <div className="body flex-grow-1 px-3">
          <div style={{ padding: '0 20px' }}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="visa_type_name" className="form-label">
                  Visa Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="visa_type_name"
                  name="visa_type_name"
                  placeholder="Visa Type Name"
                  pattern="[A-Za-z\s\-]+"
                  required
                  autoFocus
                  onChange={handleChange}
                  value={formData.visa_type_name}
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="country">Country</CFormLabel>
                <CountryDropdown
                  className="form-control"
                  value={formData.country}
                  onChange={handleCountryChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="visa_fee" className="form-label">
                  Visa Fee
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="visa_fee"
                  name="Visa Fee"
                  placeholder="Fees"
                  pattern="[0-9]+"
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
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default AddVisaType

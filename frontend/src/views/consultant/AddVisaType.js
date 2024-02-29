import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CountryDropdown } from 'react-country-region-selector'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index'
import UserContext from 'src/utils/UserContext'
import { CFormLabel, CSpinner, CToast, CToastBody, CToastClose } from '@coreui/react'
import { DEFAULT_URL } from 'src/utils/Constant'

const AddVisaType = () => {
  const [loading, setLoading] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    visa_type_name: '',
    country: '',
    visa_fee: 0,
    consultant_fee: 0,
    created_by: '',
    updated_by: '',
  })

  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Add Visa Type'
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const parsedFormData = {
        ...formData,
        visa_fee: parseFloat(formData.visa_fee),
        consultant_fee: parseFloat(formData.consultant_fee),
        created_by: user._id,
        updated_by: user._id,
      }

      console.log(parsedFormData)

      const response = await axios.post(`${DEFAULT_URL}visatype/addvisatype`, parsedFormData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      })
      setErrorMessage(response.data.message)
      setAlertVisible(true)
      clearForm()
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleError = (error) => {
    let message = 'An error occurred'
    if (error.response) {
      message = error.response.data.message + ' || ' + 'Validation failed'
    } else if (error.request) {
      message = error.request
    } else {
      message = error.message
    }
    setErrorMessage(message)
    setAlertVisible(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleCountryChange = (val) => {
    setFormData((prevData) => ({ ...prevData, country: val }))
  }

  const clearForm = () => {
    setFormData({
      visa_type_name: '',
      country: '',
      visa_fee: 0,
      consultant_fee: 0,
      created_by: '',
      updated_by: '',
    })
  }

  return (
    <div>
      <AppSidebar />
      <div
        className={`position-fixed top-50 start-50 end-50 translate-middle ${
          loading ? '' : 'd-none'
        }`}
      >
        <CSpinner />
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
            onClose={() => setAlertVisible(false)}
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
                  name="visa_fee"
                  placeholder="Fees"
                  pattern="[0-9]+"
                  required
                  onChange={handleChange}
                  value={formData.visa_fee}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="consultant_fee" className="form-label">
                  Consultant Fee
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="consultant_fee"
                  name="consultant_fee"
                  placeholder="Fees"
                  pattern="[0-9]+"
                  required
                  onChange={handleChange}
                  value={formData.consultant_fee}
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

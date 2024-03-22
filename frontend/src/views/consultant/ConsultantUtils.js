import React, { useContext, useEffect, useState } from 'react'
import { DEFAULT_URL } from 'src/utils/Constant'
import UserContext from 'src/utils/UserContext'
import axios from 'axios'
import { AppFooter, AppHeader, AppSidebar } from 'src/components'

const ConsultantUtils = () => {
  const [alertVisible, setAlertVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useContext(UserContext)

  useEffect(() => {
    document.title = 'Utilities'
  })

  const handleSubmit = async () => {
    
    setIsLoading(true)
    try {
      const jwtToken = user.jwtToken
      const response = await axios.get(`${DEFAULT_URL}consultant/getallconsultants`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      console.log(response.data.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setErrorMessage(e.target.value)
  }

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
          <div className="position-fixed  start-50 end-50 translate-middle">
            {isLoading && <CSpinner />}
          </div>
          {isLoading && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: '90vh' }}
            >
              <CSpinner />
            </div>
          )}
          {alertVisible && (
            <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: '9999' }}>
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

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="consultant_fees" className="form-label">
                Consultant Fees
              </label>
              <input
                type="text"
                className="form-control"
                id="consultant_fees"
                name="consultant_fees"
                placeholder="Set Consultant Fees"
                pattern="[A-Za-z\s\-]+"
                required
                autoFocus
                onChange={handleChange}
                value={"100"}
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

export default ConsultantUtils

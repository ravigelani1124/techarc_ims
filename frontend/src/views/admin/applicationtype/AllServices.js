import React, { useContext, useEffect, useState } from 'react'
import { CToast, CToastBody, CToastClose } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import UserContext from 'src/utils/UserContext'
import axios from 'axios'
import { DEFAULT_URL } from 'src/utils/Constant'
import DynamicAccordion from 'src/components/DynamicAccordion'
import { CSpinner } from '@coreui/react'

const AllServices = () => {
  const [loading, setLoading] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    document.title = 'Application Types'
    fetchAllServices()
  }, [])

  const fetchAllServices = async () => {
    setLoading(true)
    try {
      const token = user?.jwtToken
      const response = await axios.get(`${DEFAULT_URL}application/getapplicationwithsubtype`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      setData(response.data.data)
    } catch (error) {
      setErrorMessage(error.response.data)
      setAlertVisible(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <AppSidebar />
      {loading && (
        <div className="position-fixed top-50 start-50 end-50 translate-middle">
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
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <div style={{ padding: '0 20px' }}>
            <DynamicAccordion data={data} onCallback={fetchAllServices} />
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default AllServices

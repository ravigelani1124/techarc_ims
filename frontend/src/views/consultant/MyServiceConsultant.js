import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppSidebar, AppFooter, AppHeader } from '../../components'
import UserContext from 'src/utils/UserContext'
import { DEFAULT_URL } from 'src/utils/Constant'
import { CToast, CToastBody, CToastClose } from '@coreui/react'
import {
  CButtonGroup,
  CButton,
  CSpinner,
  CListGroup,
  CListGroupItem,
  CFormCheck,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from '@coreui/react'

const MyServiceConsultant = () => {
  const [loading, setLoading] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'My Services'
    if (!user) {
      navigate('/')
    }
    fetchAllServices()
  }, [user, navigate])

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

      callConsultantSelelctedService()
    } catch (error) {
      handleError(error)
      setAlertVisible(true)
    } finally {
      setLoading(false)
    }
  }

  const callConsultantSelelctedService = async () => {
    try {
      const token = user?.jwtToken
      const id = user?._id
      const response = await axios.get(
        `${DEFAULT_URL}application/getconsultantselectedservices/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setSelectedItems(response.data.data)
    } catch (error) {
      handleError(error)
      setAlertVisible(true)
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

  const handleSelectAll = () => {
    const allItems = data.reduce((acc, item) => {
      return [...acc, ...item.sub_application_type.map((subItem) => subItem._id)]
    }, [])
    setSelectedItems(allItems)
  }

  const handleDeselectAll = () => {
    setSelectedItems([])
  }

  const handleItemSelect = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId))
    } else {
      setSelectedItems([...selectedItems, itemId])
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      const token = user?.jwtToken
      const requestData = {
        consultant_id: user?._id,
        services: selectedItems,
      }

      const response = await axios.post(
        `${DEFAULT_URL}application/addconsultantselectedservices`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      console.log(response.data.data)      
      fetchAllServices()
    } catch (error) {
      handleError(error)
      setAlertVisible(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <AppSidebar />
      {loading && (
        <div className={`position-fixed top-50 start-50 end-50 translate-middle`}>
          <CSpinner />
        </div>
      )}
      {alertVisible && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: '9999',
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
          <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'flex-end' }}>
            <CButtonGroup role="group" aria-label="Basic outlined example">
              <CButton color="primary" onClick={handleSelectAll} variant="outline">
                Select All
              </CButton>
              <CButton color="primary" variant="outline" onClick={handleDeselectAll}>
                Deselect All
              </CButton>
              <CButton color="primary" variant="outline" onClick={handleSubmit}>
                Submit
              </CButton>
            </CButtonGroup>
          </div>
          <div style={{ padding: '0 20px' }}>
            <CAccordion alwaysOpen>
              {data.map((item, index) => (
                <CAccordionItem key={index} itemKey={index}>
                  <CAccordionHeader>{item.application_description}</CAccordionHeader>
                  <CAccordionBody>
                    <CListGroup>
                      {item.sub_application_type.map((subItem, subIndex) => (
                        <CListGroupItem key={subIndex}>
                          <CFormCheck
                            label={subItem.sub_application_description}
                            checked={selectedItems.includes(subItem._id)}
                            onChange={() => handleItemSelect(subItem._id)}
                          />
                        </CListGroupItem>
                      ))}
                    </CListGroup>
                  </CAccordionBody>
                </CAccordionItem>
              ))}
            </CAccordion>
          </div>
        </div>

        <AppFooter />
      </div>
    </div>
  )
}

export default MyServiceConsultant

import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import UserContext from 'src/utils/UserContext'
import ConsultancyForm from '../../components/ConsultancyForm'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CFormInput,
  CSpinner,
  CToast,
  CToastBody,
  CToastClose,
} from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index'

import CIcon from '@coreui/icons-react'
import { cilDelete } from '@coreui/icons'

const ConsultancyInfo = () => {
  const [showForm, setShowForm] = useState(false)
  const [consultancies, setConsultancies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const { user } = useContext(UserContext)

  useEffect(() => {
    const fetchDataForConsultancy = async () => {
      setIsLoading(true)
      try {
        if (user === null) {
          throw new Error('Login Required')
        }
        const token = user.jwtToken
        if (!token) {
          throw new Error('Login Required')
        }
        const response = await axios.get(
          'http://localhost:3000/api/consultancy/getConsultancyList',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setConsultancies(response.data.data)
      } catch (error) {
        console.error(error)
        setAlertVisible(true)
        setErrorMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDataForConsultancy()
  }, [user])

  const handleAddConsultancyClick = () => {
    if (!showForm) {
      setShowForm(true)
    } else setShowForm(false)
  }

  const updateConsultancies = async () => {
    try {
      const token = user.jwtToken
      if (!token) {
        throw new Error('Login Required')
      }
      const response = await axios.get('http://localhost:3000/api/consultancy/getConsultancyList', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      setConsultancies(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const filteredConsultancies = consultancies.filter((item) =>
    item.consultancyName.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        {isLoading && <CSpinner size="sm" style={{ width: '3rem', height: '3rem' }} />}
        {alertVisible && (
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
        )}
        <div className="mb-4">
          <div className="mb-3 d-flex justify-content-end" style={{ padding: '0 20px' }}>
            <h4>
              <CButton color="primary" onClick={handleAddConsultancyClick}>
                Add New Consultancy Group
              </CButton>
            </h4>
          </div>
          {showForm && (
            <div>
              <ConsultancyForm
                onClose={() => setShowForm(false)}
                updateConsultancies={updateConsultancies}
              />
              <br />
            </div>
          )}

          <div className="mb-3" style={{ padding: '0 20px' }}>
            <CFormInput
              placeholder="Search Consultancy..."
              aria-label="Search input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            />
          </div>
        </div>
        <div  style={{ padding: '0 20px' }}>
        <CTable align="middle" className="mb-0 border" hover responsive >
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Consultancy Name</CTableHeaderCell>
              <CTableHeaderCell>License No.</CTableHeaderCell>
              {/* <CTableHeaderCell>Delete</CTableHeaderCell> */}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredConsultancies.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>
                  <div>{index + 1}</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item.consultancyName}</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item.licenseNumber}</div>
                </CTableDataCell>
                {/* <CTableDataCell>
                  <div>{<CIcon icon={cilDelete} size="xl"/>}</div>
                </CTableDataCell>                 */}
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        </div>
        <AppFooter />
      </div>
    </>
  )
}

export default ConsultancyInfo

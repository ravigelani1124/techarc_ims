import React, { useState } from 'react'
import ConsultantForm from 'src/components/ConsultantForm'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CFormInput, 
} from '@coreui/react'
import { AppSidebar, AppHeader, AppFooter } from '../../components/index'

const ConsultantInfo = () => {
  const [showForm, setShowForm] = useState(false)

  // tableData
  const tableData = [
    {
      email: { name: 'jaydoshi2010@gmail.com' },
      consultantName: { name: 'John Doe' },
      consultancyName: { name: 'Prime Time Consultancy' },
      licenseNumber: { value: '123456789' },
      isverified: { value: 'pending' },
    },
  ]
  const handleAddConsultantClick = () => {
    if (!showForm) {
      setShowForm(true)
    } else setShowForm(false)
  }

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div>
          <div className="mb-4">
            <div className="mb-3 d-flex justify-content-end" style={{ padding: '0 20px' }}>
              <h4>
                <CButton color="primary" onClick={handleAddConsultantClick}>
                  Add New Consultant
                </CButton>
              </h4>
            </div>
            {showForm && (
              <div>
                <ConsultantForm onClose={() => setShowForm(false)} />
                <br />
              </div>
            )}
            <div className="mb-3" style={{ padding: '0 20px' }}>
            <CFormInput
              placeholder="Search Consultant Name..."
              aria-label="Search input"
              type="text"
            />
          </div>
          </div>
          <div  style={{ padding: '0 20px' }}>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Consultant Name</CTableHeaderCell>
                <CTableHeaderCell>Consultancy Group</CTableHeaderCell>
                <CTableHeaderCell>License No.</CTableHeaderCell>
                <CTableHeaderCell>isverified</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {tableData.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell>
                    <div>{index + 1}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.email.name}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.consultantName.name}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.consultancyName.name}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.licenseNumber.value}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.isverified.value}</div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          </div>
        </div>
        <AppFooter />
      </div>
    </>
  )
}

export default ConsultantInfo

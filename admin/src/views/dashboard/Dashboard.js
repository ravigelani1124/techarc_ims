import React from 'react'

import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const Dashboard = () => {
    //tableData
    const tableData = [
      {
        email: { name: 'jaydoshi2010@gmail.com' },
        consultantName: { name: 'John Doe'},
        consultancyName: { name: 'Prime Time Consultancy' },
        licenseNumber: { value: '123456789' },
        isverified: { value: 'pending' }
      },
    ];

  return (
    <div>
      <div className="mb-4">
        <h4><center>Consultant Information</center></h4>
      </div>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell >Consultant Name</CTableHeaderCell>
            <CTableHeaderCell>Consultancy Name</CTableHeaderCell>
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
              <CTableDataCell >
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
  )
}

export default Dashboard

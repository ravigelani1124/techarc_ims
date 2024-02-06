import React, { useState } from 'react';
import { ConsultancyForm } from 'src/components';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CFormInput,
} from '@coreui/react';
import { AppSidebar, AppHeader, AppFooter } from '../../components/index';

const ConsultancyInfo = () => {
  const [showForm, setShowForm] = useState(false);

  const tableData = [
    {
      consultancyName: { name: 'Prime Time Consultancy' },
      licenseNumber: { value: '123456789' },
    },
  ];

  const handleAddConsultancyClick = () => {
    setShowForm(true);
  };

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div>
          <div className="mb-4">
            <h4>
              <CButton color="primary" onClick={handleAddConsultancyClick}>
                Add New Consultancy Group
              </CButton>
            </h4>
            {showForm && (
              <div>
                <ConsultancyForm onClose={() => setShowForm(false)} />
                <br/>
              </div>
            )}
            <div className="mb-3">
              <CFormInput placeholder="Search Consultancy..." aria-label="Search input" type="text"/>
            </div>
          </div>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Consultancy Name</CTableHeaderCell>
                <CTableHeaderCell>License No.</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {tableData.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>
                    <div>{index + 1}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.consultancyName.name}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.licenseNumber.value}</div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </div>
        <AppFooter /> 
      </div>
    </>
  );
};

export default ConsultancyInfo;

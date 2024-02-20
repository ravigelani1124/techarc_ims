import React from 'react';
import { CContainer, CRow, CCol, CCard, CCardBody, CCardHeader } from '@coreui/react';

const NoDataView = ({ message }) => {
  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md="8">
          <CCard style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
            <CCardHeader style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>No Data</CCardHeader>
            <CCardBody>
              <p style={{ color: '#6c757d' }}>{message}</p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default NoDataView;

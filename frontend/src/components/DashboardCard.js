import React from 'react';
import { CCardBody, CCard, CCardTitle, CCardText } from '@coreui/react';

const DashboardCard = ({ title, value }) => {
  return (
    <CCard style={{ width: '18rem', backgroundColor: '#303C54', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <CCardBody style={{ padding: '20px', color: '#eeeeee' }}>
        <CCardTitle style={{ marginBottom: '30px', fontSize: '18px' }}>{title}</CCardTitle>
        <CCardText style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</CCardText>
      </CCardBody>
    </CCard>
  );
};

export default DashboardCard;

import React from 'react';
import NoDataView from './NoDataView';

const CenteredNoDataView = ({ message }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Adjust as needed
      }}
    >
      <div style={{ padding: '0 20px' }}>
        <NoDataView message={message} />
      </div>
    </div>
  );
};

export default CenteredNoDataView;


{consultant.length === 0 ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh', // Adjust as needed
      }}
    >
      <NoDataView message="Consultant data not available" />
    </div>
  ) : (<></>) }
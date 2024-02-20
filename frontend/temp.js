import React, { useState } from 'react';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CButton
} from '@coreui/react';

const AppointmentBooking = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement booking logic here
    console.log('Appointment booked:', { name, email, selectedDate });
  };

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md="6">
          <CCard>
            <CCardBody>
              <h5 className="card-title mb-4">Book Appointment</h5>
              <CForm onSubmit={handleSubmit}>
                <CFormGroup>
                  <CLabel>Name</CLabel>
                  <CInput
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Email</CLabel>
                  <CInput
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel>Date</CLabel>
                  <CInput
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </CFormGroup>
                <CButton type="submit" color="primary">Book Appointment</CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default AppointmentBooking;

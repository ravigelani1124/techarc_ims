import React from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react';
import { AppSidebar, AppHeader, AppFooter } from '../../../components/index'; // Import AppSidebar, AppHeader, and AppFooter

const FormControl = () => {
  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Add New Consultant</strong>
              </CCardHeader>
              <CCardBody>
                <CForm>
                  <div className="mb-3">
                    <CFormLabel htmlFor="nameInput">Consultant Name</CFormLabel>
                    <CFormInput
                      type="name"
                      id="nameInput"
                      placeholder="John Doe"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="nameInput">Consultancy Group</CFormLabel>
                    <CFormSelect aria-label="Default select example" id="consultancyInput">
                      <option required>Select</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </CFormSelect>
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="licInput">License Number</CFormLabel>
                    <CFormInput
                      type="tel"
                      id="licInput"
                      placeholder="11220054"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="contactInput">Contact Number</CFormLabel>
                    <CFormInput
                      type="tel"
                      id="contactInput"
                      placeholder="123-456-7890"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="emailInput">Email address</CFormLabel>
                    <CFormInput
                      type="email"
                      id="emailInput"
                      placeholder="name@example.com"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="mb-3">
                    <CButton color="primary" type="submit">
                      Create
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <AppFooter /> {/* Include AppFooter */}
      </div>
    </>
  );
};

export default FormControl;

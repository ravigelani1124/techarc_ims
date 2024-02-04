import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormSelect,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const FormControl = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add New Consultant</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="forms/form-control">
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
                  <CFormLabel htmlFor="consultancyInput">Consultancy Name</CFormLabel>
                  <CFormInput
                    type="name"
                    id="consultancyInput"
                    placeholder="Prime Time Consultancy"
                    required
                    autoFocus
                  />
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
                {/* <div className="mb-3">
                  <CFormSelect aria-label="Default select example">
                    <option>Select Consultant Group</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </CFormSelect>
                </div> */}
                <div className="mb-3">
                  <CButton color="primary" type="submit">
                    Create
                  </CButton>
                  {/* <CFormLabel htmlFor="exampleFormControlTextarea1">Example textarea</CFormLabel>
                  <CFormTextarea id="exampleFormControlTextarea1" rows="3"></CFormTextarea> */}
                </div>
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FormControl

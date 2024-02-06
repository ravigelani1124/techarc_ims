import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cil3d, cilLockLocked, cilTerminal, cilUser } from '@coreui/icons'

const Login = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Admin Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput name="adminEmail" type="email" placeholder="Email" autoComplete="email" required/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="adminPassword"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cil3d} />
                      </CInputGroupText>
                      <CFormInput name="privateKey" type='tel' placeholder="Private Key" required/>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Admin Sign up</h1>
                    <p className="text-medium-emphasis">Sign up to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput name="adminName" type='name' placeholder="Name" autoComplete="name" required/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilTerminal} />
                      </CInputGroupText>
                      <CFormInput name="adminEmail" type='email' placeholder="Email" autoComplete="email" required/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="adminPassword"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cil3d} />
                      </CInputGroupText>
                      <CFormInput name="privateKey" type='tel' placeholder="Private Key" required/>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4">
                          Sign Up
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

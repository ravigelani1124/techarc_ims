import React, { useEffect } from 'react'
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
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

const Launcher = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('user')
    console.log('Launcher----------: ', userLoggedIn)
    if (userLoggedIn) {
      navigate('/dashboard')
    }
  }, [navigate])

  return (
    <div className="bg-light min-vh-100 d-flex flex-column justify-content-between">
      {/* Header */}
      <header className="bg-dark text-white text-center py-3">
        <div className="header-content d-flex justify-content-end">
          <Link to="/about" className="nav-link me-3">
            About
          </Link>
          <Link to="/visa" className="nav-link me-3">
            Visa
          </Link>
          <Link to="/blog" className="nav-link me-3">
            Blog
          </Link>
          <Link to="/contact" className="nav-link me-3">
            Contact
          </Link>
        
        </div>
      </header>

      {/* Main Content */}
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              {/* User Login */}
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h2>User Login</h2>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="userEmail"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="userPassword"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        required
                      />
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

              {/* Consultant Login */}
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h2>Consultant Login</h2>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="consultantEmail"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="consultantPassword"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        required
                      />
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
            </CCardGroup>
            <br />
            <div className="d-flex justify-content-center">
              <Link to="/adminauth">
                <CButton color="primary" className="px-4">
                  Admin Login
                </CButton>
              </Link>
            </div>
          </CCol>
        </CRow>
      </CContainer>

      {/* Footer */}
      <footer className="bg-dark text-white text-center p-2">
        <span className="me-2">Powerd by : TechArc</span>
      </footer>
    </div>
  )
}

export default Launcher

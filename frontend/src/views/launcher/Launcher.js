import React, { useEffect, useState, useContext } from 'react'
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
  CRow, CSpinner, CToast, CToastBody, CToastClose
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import UserContext from 'src/utils/UserContext'
import axios from 'axios'
import { DEFAULT_URL } from 'src/utils/Constant'

const Launcher = () => {

  const [consultantEmail , setConsultantEmail] = useState('')
  const [consultantPassword , setConsultantPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { loginUser } = useContext(UserContext);

  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'User | Consultant';
    const userLoggedIn = localStorage.getItem('user')
    console.log('Launcher----------: ', userLoggedIn)
    if (userLoggedIn) {
      navigate('/dashboard')
    }
  }, [navigate])


  const clearConsultantLoginField = () => {
    setConsultantEmail('')
    setConsultantPassword('')
  };

  const handleConsultantLogin = async (e) => {
    e.preventDefault();
    if (!consultantEmail || !consultantPassword) {
      setErrorMessage('All Fields Required*');
      setAlertVisible(true);
    } else {
      setAlertVisible(false);
      setIsLoading(true);
      await callConsultantLoginAPI();
    }
  };

  const callConsultantLoginAPI = async () => {
    try {
      const response = await axios.post(DEFAULT_URL + 'auth/consultantlogin', {
        consultant_email: consultantEmail,
        consultant_password: consultantPassword,
      });
      const successMessage = response.data.data.message;
      
      setIsLoading(false);
      setErrorMessage(successMessage);
      setAlertVisible(true);
      loginUser(response.data.data);
      clearConsultantLoginField();
      navigate('/dashboard');
    } catch (error) {
      setIsLoading(false);
      setAlertVisible(true);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        console.log('No response received:', error.request);
        setErrorMessage('No response received');
      } else {
        console.log('Error during request setup:', error.message);
        setErrorMessage('Error during request setup');
      }
    }
  };

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
      {isLoading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh' }}
          >
            <CSpinner />
          </div>
        )}
        {alertVisible && (
          <div
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: '9999', // Ensure it's above other content
            }}
          >
            <CToast
              autohide={false}
              visible={true}
              color="primary"
              className="text-white align-items-center"
            >
              <div className="d-flex">
                <CToastBody>{errorMessage}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
              </div>
            </CToast>
          </div>
        )}
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
                        onChange={(e) => setConsultantEmail(e.target.value)}
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
                        onChange={(e) => setConsultantPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton disabled={isLoading} onClick={handleConsultantLogin} color="primary" className="px-4">
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

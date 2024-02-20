import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  CSpinner,
  CToast,
  CToastBody,
  CToastClose,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cil3d, cilLockLocked, cilTerminal, cilUser } from '@coreui/icons';
import UserContext from 'src/utils/UserContext';
import { DEFAULT_URL } from 'src/utils/Constant';
import axios from 'axios';

const Login = () => {

  useEffect(() => {
    document.title = 'Admin';
  }, []);

  const { loginUser } = useContext(UserContext);

  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [emailSignUp, setEmailSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [nameSignUp, setNameSignUp] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const clearLoginField = () => {
    setEmailLogin('');
    setPasswordLogin('');
  };

  const clearSignUp = () => {
    setEmailSignUp('');
    setPasswordSignUp('');
    setNameSignUp('');
    setPrivateKey('');
  };

  const fetchDataLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(DEFAULT_URL + 'auth/adminlogin', {
        email: emailLogin,
        password: passwordLogin,
      });
      const successMessage = response.data.data.message;
      setIsLoading(false);
      setErrorMessage(successMessage);
      setAlertVisible(true);
      clearLoginField();
      loginUser(response.data.data);
      navigate('/admin/dashboard');
    } catch (error) {
      setIsLoading(false);
      setAlertVisible(true);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        console.log('No response received:', error.request);
        setErrorMessage(error.request);
      } else {
        console.log('Error during request setup:', error.message);
        setErrorMessage(error.request);
      }
    }
  };

  const fetchDataSignUp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(DEFAULT_URL + 'auth/adminsignup', {
        email: emailSignUp,
        password: passwordSignUp,
        name: nameSignUp,
        privateKey: privateKey,
      });
      const successMessage = response.data.message;
      setIsLoading(false);
      clearSignUp();
      setErrorMessage(successMessage);
      setAlertVisible(true);
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        setAlertVisible(true);
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        console.log('No response received:', error.request);
        setAlertVisible(true);
        setErrorMessage(error.request);
      } else {
        console.log('Error during request setup:', error.message);
        setAlertVisible(true);
        setErrorMessage(error.request);
      }
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (emailLogin.length === 0 || passwordLogin.length === 0) {
      setErrorMessage('All Fields Required*');
      setAlertVisible(true);
    } else {
      setAlertVisible(false);
      handleSubmitLogin();
    }
  };

  const handleSubmitLogin = () => {
    fetchDataLogin();
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    if (
      emailSignUp.length === 0 ||
      passwordSignUp.length === 0 ||
      nameSignUp.length === 0 ||
      privateKey.length === 0
    ) {
      setErrorMessage('All Fields Required*');
      setAlertVisible(true);
    } else {
      setAlertVisible(false);
      handleSubmitSignUp();
    }
  };

  const handleSubmitSignUp = () => {
    fetchDataSignUp();
  };

  return (
    <>
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
          <Link to="/contact" className="nav-link pe-3">
            Contact
          </Link>
        </div>
      </header>

      {/* Main content */}
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
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
              onClose={() => setAlertVisible(false)}
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
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h2>Admin Login</h2>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-2">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          name="adminEmail"
                          value={emailLogin}
                          type="email"
                          placeholder="Email"
                          autoComplete="email"
                          required
                          onChange={(e) => setEmailLogin(e.target.value)}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          name="adminPassword"
                          type="password"
                          value={passwordLogin}
                          placeholder="Password"
                          autoComplete="current-password"
                          required
                          onChange={(e) => setPasswordLogin(e.target.value)}
                        />
                      </CInputGroup>

                      <CRow className="justify-content-center">
                        <CCol xs={6} className="text-center">
                          <CButton color="primary" className="px-4" onClick={handleLoginClick}>
                            Login
                          </CButton>
                        </CCol>
                      </CRow>

                      <CRow className="justify-content-center">
                        <CCol xs={6} className="text-center">
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
                      <h2>Admin Sign up</h2>
                      <p className="text-medium-emphasis">Sign up to your account</p>
                      <CInputGroup className="mb-2">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          value={nameSignUp}
                          name="adminName"
                          onChange={(e) => setNameSignUp(e.target.value)}
                          type="name"
                          placeholder="Name"
                          autoComplete="name"
                          required
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-2">
                        <CInputGroupText>
                          <CIcon icon={cilTerminal} />
                        </CInputGroupText>
                        <CFormInput
                          value={emailSignUp}
                          name="adminEmail"
                          onChange={(e) => setEmailSignUp(e.target.value)}
                          type="email"
                          placeholder="Email"
                          autoComplete="email"
                          required
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-2">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          name="adminPassword"
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          required
                          value={passwordSignUp}
                          onChange={(e) => setPasswordSignUp(e.target.value)}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-2">
                        <CInputGroupText>
                          <CIcon icon={cil3d} />
                        </CInputGroupText>
                        <CFormInput
                          value={privateKey}
                          name="privateKey"
                          onChange={(e) => setPrivateKey(e.target.value)}
                          type="password"
                          placeholder="Private Key"
                          required
                        />
                      </CInputGroup>

                      <CRow className="justify-content-center">
                        <CCol xs={6} className="text-center">
                          <CButton color="primary" className="px-4" onClick={handleSignUpClick}>
                            SignUp
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

      {/* Footer */}
      <footer className="bg-dark text-white text-center p-2">
        <span className="me-2">Powerd by : TechArc</span>
      </footer>
      </div>
    </>
  );
};

export default Login;
 
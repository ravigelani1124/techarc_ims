import React, { useEffect, useState, useContext } from 'react';
import { AppSidebar, AppFooter, AppHeader } from './index';
import UserContext from 'src/utils/UserContext';
import axios from 'axios';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { CFormLabel, CSpinner, CToast, CToastBody, CToastClose } from '@coreui/react';
import { CRow, CCol } from '@coreui/react';
import { DEFAULT_URL } from 'src/utils/Constant';

const AddUserForm = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    document.title = 'Add User';
  }, []);



  return (
    <>
      <AppSidebar />
      <div className="position-fixed top-50 start-50 end-50 translate-middle">{loading && <CSpinner />}</div>
      {alertVisible && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: '9999' }}>
          <CToast autohide={false} visible={true} color="primary" className="text-white align-items-center">
            <div className="d-flex">
              <CToastBody>{errorMessage}</CToastBody>
              <CToastClose className="me-2 m-auto" white />
            </div>
          </CToast>
        </div>
      )}
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
       
        <AppFooter />
      </div>
    </>
  );
};

export default AddUserForm;

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index';
import UserContext from 'src/utils/UserContext';
import { CSpinner, CToast, CToastBody, CToastClose } from '@coreui/react';
import { DEFAULT_URL } from 'src/utils/Constant';

const AddDocument = () => {
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    document_code: '',
    document_name: '',    
  });

  useEffect(() => {
    document.title = 'Add Document';
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log(formData);
    try {
      const response = await axios.post(`${DEFAULT_URL}document/adddocument`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.jwtToken}`,
        },
      });

      setErrorMessage(response.data.message);
      setAlertVisible(true);
      clearForm();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error) => {
    let message = 'An error occurred';
    if (error.response) {
      message = error.response.data.message + ' || ' + 'Validation failed';
    } else if (error.request) {
      message = error.request;
    } else {
      message = error.message;
    }
    setErrorMessage(message);
    setAlertVisible(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const clearForm = () => {
    setFormData({
        document_code: '',
        document_name: '',    
    });
  };

  return (
    <div>
      <AppSidebar />
      {loading && (
        <div className="position-fixed top-50 start-50 end-50 translate-middle">
          <CSpinner />
        </div>
      )}
      {alertVisible && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: '9999' }}>
          <CToast autohide={false} visible={true} color="primary" className="text-white align-items-center" onClose={() => setAlertVisible(false)}>
            <div className="d-flex">
              <CToastBody>{errorMessage}</CToastBody>
              <CToastClose className="me-2 m-auto" white />
            </div>
          </CToast>
        </div>
      )}
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <div style={{ padding: '0 20px' }}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="document_code" className="form-label">
                  Document Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="document_code"
                  name="document_code"                  
                  placeholder="CON234"
                  pattern="[A-Za-z0-9]{1,6}"  
                  required
                  autoFocus
                  onChange={handleChange}
                  value={formData.document_code}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="document_name" className="form-label">
                  Document Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="document_name"
                  name="document_name"
                  placeholder="Document Name"
                  pattern="[A-Za-z\s\-]+"
                  required
                  autoFocus
                  onChange={handleChange}
                  value={formData.document_name}
                />
              </div>
              <div className="mb-3 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary px-4">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default AddDocument;

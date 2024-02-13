import React, { useEffect, useState, useContext } from 'react';
import ConsultantForm from 'src/components/ConsultantForm';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CFormInput,CSpinner,
} from '@coreui/react';
import { cilCheckCircle, cilXCircle } from '@coreui/icons'
import { AppSidebar, AppHeader, AppFooter } from '../../components/index';
import UserContext from 'src/utils/UserContext';
import axios from 'axios';
import { DEFAULT_URL } from 'src/utils/Constant';
import CIcon from '@coreui/icons-react'

const ConsultantList = () => {

  useEffect(() => {
    document.title = 'Admin | Consultant';
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [consultant, setConsultant] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(UserContext);
  const [consultancies, setConsultancies] = useState([]);


  useEffect(() => {
    chainAPIs();
  }, []);

  
async function chainAPIs() {
  await fetchDataForConsultant();
  //await callConsultanyAPI();
}
  const callConsultanyAPI = async () => {
    try {
      const token = user.jwtToken
      
      const response = await axios.get(DEFAULT_URL+'consultancy/getConsultancyList', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      console.log("Consultancy----",response.data.data)
      setConsultancies(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }
  const fetchDataForConsultant = async () => {
    setIsLoading(true);
    try {
      const token = user?.jwtToken;
      if (!token) {
        throw new Error('Login Required');
      }
      const response = await axios.get(`${DEFAULT_URL}auth/getConsultantList`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Consultant----",response.data.data)
      setConsultant(response.data.data);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred');
      setAlertVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddConsultantClick = () => {
    setShowForm(!showForm);
  };


  const filteredConsultants = consultant.filter((item) =>
  item.consultant_name_en.toLowerCase().includes(searchQuery.toLowerCase())
);


  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        {isLoading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh' }}
          >
            <CSpinner />
          </div>
        )}
        <div>
          <div className="mb-4">
            {/* <div className="mb-3 d-flex justify-content-end" style={{ padding: '0 20px' }}>
              <h4>
                <CButton color="primary" onClick={handleAddConsultantClick}>
                  {showForm ? 'Close Form' : 'Add New Consultant'}
                </CButton>
              </h4>
            </div> */}
            {/* {showForm && (
              <div>
                <ConsultantForm consultancies= {consultancies} onClose={() => setShowForm(false)} />
                <br />
              </div>
            )} */}
            <div className="mb-3" style={{ padding: '0 20px' }}>
              <CFormInput
                placeholder="Search Consultant Name..."
                aria-label="Search input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div style={{ padding: '0 20px' }}>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Code</CTableHeaderCell>
                  <CTableHeaderCell>Consultant Name</CTableHeaderCell>
                  <CTableHeaderCell>Organization</CTableHeaderCell>                                    
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Phone</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>                  
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredConsultants.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell >
                      <div>{index + 1}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.consultant_code}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                    <div>{item.consultant_name_en}</div>                      
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.org_name_en}</div>
                    </CTableDataCell>                    
                    <CTableDataCell >                      
                      {item.is_email_verified ? (
                      <div>
                        {<CIcon icon={cilCheckCircle} className="text-success" size="xl" />}
                      </div>
                    ) : (
                      <div>{<CIcon icon={cilXCircle} className="text-danger" size="xl" />}</div>
                    )}
                    </CTableDataCell>
                    <CTableDataCell>
                    {item.is_phone_verified ? (
                      <div>
                        {<CIcon icon={cilCheckCircle} className="text-success" size="xl" />}
                      </div>
                    ) : (
                      <div>{<CIcon icon={cilXCircle} className="text-danger" size="xl" />}</div>
                    )}
                    </CTableDataCell>
                    <CTableDataCell>
                    {item.record_status ? (
                      <div>
                        {<CButton  style={{ width: '100px' }} color="success">Active</CButton>}
                      </div>
                    ) : (
                      <div>{<CButton  style={{ width: '100px' }} color="danger">In Active</CButton>}</div>
                    )}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </div>
        </div>
        <AppFooter />
      </div>
    </>
  );
};

export default ConsultantList;

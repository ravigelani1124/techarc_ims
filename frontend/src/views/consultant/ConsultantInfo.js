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
  CFormInput,CSpinner
} from '@coreui/react';
import { AppSidebar, AppHeader, AppFooter } from '../../components/index';
import UserContext from 'src/utils/UserContext';
import axios from 'axios';
import { DEFAULT_URL } from 'src/utils/Constant';

const ConsultantInfo = () => {
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
  }, [user]);

  
async function chainAPIs() {
  await fetchDataForConsultant();
  await callConsultanyAPI();
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
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        {isLoading &&<div className="d-flex justify-content-center">
            <CSpinner />
          </div>}
        <div>
          <div className="mb-4">
            <div className="mb-3 d-flex justify-content-end" style={{ padding: '0 20px' }}>
              <h4>
                <CButton color="primary" onClick={handleAddConsultantClick}>
                  {showForm ? 'Close Form' : 'Add New Consultant'}
                </CButton>
              </h4>
            </div>
            {showForm && (
              <div>
                <ConsultantForm consultancies= {consultancies} onClose={() => setShowForm(false)} />
                <br />
              </div>
            )}
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
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Consultant Name</CTableHeaderCell>
                  <CTableHeaderCell>Consultancy Group</CTableHeaderCell>
                  <CTableHeaderCell>License No.</CTableHeaderCell>
                  <CTableHeaderCell>Verified</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredConsultants.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>
                      <div>{index + 1}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.email}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.name}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.consultancyName}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.licenseNumber}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.isVerified ? 'Yes' : 'No'}</div>
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

export default ConsultantInfo;

// Import required components and icons
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
  CFormInput,
  CSpinner,
} from '@coreui/react';
import { cilCheckCircle, cilXCircle } from '@coreui/icons'
import { AppSidebar, AppHeader, AppFooter } from '../../components/index';
import UserContext from 'src/utils/UserContext';
import axios from 'axios';
import { DEFAULT_URL } from 'src/utils/Constant';
import CIcon from '@coreui/icons-react';

const ConsultantInfo = () => {
  // Define state variables
  const [showForm, setShowForm] = useState(false);
  const [consultant, setConsultant] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(UserContext);
  const [consultancies, setConsultancies] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    chainAPIs();
  }, []);

  // Fetch data for consultants
  async function chainAPIs() {
    await fetchDataForConsultant();
    //await callConsultanyAPI();
  }

  // Call API to fetch consultancy list
  const callConsultanyAPI = async () => {
    try {
      const token = user.jwtToken;
      const response = await axios.get(DEFAULT_URL + 'consultancy/getConsultancyList', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setConsultancies(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  // Fetch data for consultant list
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
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle click event for adding a new consultant
  const handleAddConsultantClick = () => {
    setShowForm(!showForm);
  };

  // Filter consultants based on search query
  const filteredConsultants = consultant.filter((item) =>
    item.consultant_name_en.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        {isLoading && (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <CSpinner />
          </div>
        )}
        <div>
          <div className="mb-4">
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
                  <CTableHeaderCell style={{ textAlign: 'center' }}>Consultant Name</CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'center' }}>Organization</CTableHeaderCell>                  
                  <CTableHeaderCell>Email Verified</CTableHeaderCell>
                  <CTableHeaderCell>Phone Verified</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredConsultants.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>
                      <div>{index + 1}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.consultant_code}</div>
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'center' }}>{item.consultant_name_en}</CTableDataCell>                      
                    <CTableDataCell style={{ textAlign: 'center' }}>{item.org_name_en}</CTableDataCell>                    
                    <CTableDataCell style={{ textAlign: 'center' }}>
                      {item.is_email_verified ? (
                        <CIcon icon={cilCheckCircle} className="text-success" size="xl" />
                      ) : (
                        <CIcon icon={cilXCircle} className="text-danger" size="xl" />
                      )}
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'center' }}>
                      {item.is_phone_verified ? (
                        <CIcon icon={cilCheckCircle} className="text-success" size="xl" />
                      ) : (
                        <CIcon icon={cilXCircle} className="text-danger" size="xl" />
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

export default ConsultantInfo;

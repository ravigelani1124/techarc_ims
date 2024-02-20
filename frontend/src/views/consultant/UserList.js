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

const UserList = () => {

  useEffect(() => {
    document.title = 'Users';
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [user]);


  const handleUpdateStatus = async (item) => {
    setIsLoading(true)

    try {
      const id = item._id
      const isActive = !item.record_status
      const role = item.role

      console.log(id, isActive, role)
      const response = await axios.post(DEFAULT_URL + 'auth/updateuserstatus', {
        id: id,
        isActive: isActive,
        role: role,
      })

      if (response.status === 200) {
        setIsLoading(false)
        setErrorMessage(response.data.message)
        setAlertVisible(true)
        fetchUsers();
      } else {
        setIsLoading(false)
        setErrorMessage(response.data.message)
        setAlertVisible(true)
        console.error(response.data.message)
      }
    } catch (error) {
      setIsLoading(false)
      setErrorMessage(error.message)
      setAlertVisible(true)
      console.error(error.message)
    }
  }


  const fetchUsers = async () => {

    if(!user) {
      setIsLoading(false)
      setErrorMessage('Login Required')
      setAlertVisible(true)
      return
    }
    const token = user.jwtToken
    const id = user._id
    if (!token) {
      throw new Error('Login Required')
    }
    setIsLoading(true)
    try {
      const response = await axios.get(DEFAULT_URL + 'auth/users', {
        params: { id },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      console.log("Users----",response.data.data)
      setUsers(response.data.data)
    }catch (error) {
      console.error(error)
      setAlertVisible(true)
      setErrorMessage(error.message.message)
    } finally {
      setIsLoading(false)
    }
  }

let filtersUsers = []
if (users && Array.isArray(users)) {
  filtersUsers = users.filter((item) =>
    item.user_name_en.toLowerCase().includes(searchQuery.toLowerCase())
  );
} 


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
         <div className="mb-3" style={{ padding: '0 20px' }}>
              <CFormInput
                placeholder="Search users by name.."
                aria-label="Search input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>        
       <div style={{ padding: '0 20px' }}>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Code</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>                
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Phone</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>                  
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filtersUsers.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell >
                      <div>{index + 1}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.user_code}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                    <div>{item.user_name_en}</div>                      
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
                        {<CButton  onClick={() => handleUpdateStatus(item)} style={{ width: '100px' }} color="success">Active</CButton>}
                      </div>
                    ) : (
                      <div>{<CButton  onClick={() => handleUpdateStatus(item)} style={{ width: '100px' }} color="danger">In Active</CButton>}</div>
                    )}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </div>

        <AppFooter />
      </div>
    </>
  );
};

export default UserList;

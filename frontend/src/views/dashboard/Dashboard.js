import React, {useContext, useEffect,} from 'react';
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import UserContext from 'src/utils/UserContext';
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext);
  
  useEffect(() => {
    if (!user) {
      navigate('/')
    }    
  },[user])
  
  // If user is not authenticated, redirect to the launcher page
  
  console.log("User: ", user)
  
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <div className="mb-4">
            <h4>
              <center>Welcome to TechArch</center>
            </h4>
            <h6>
              <center>{"Hello, " + (user?.name || 'Guest') + "!"}</center>
            </h6>
          </div>        
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default Dashboard;

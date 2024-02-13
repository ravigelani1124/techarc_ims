import React, { Component, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './scss/style.scss';
import { UserProvider } from './utils/UserContext';
import PrivateRoutes from './components/PrivateRoutes';
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Pages
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const OrganizationList = React.lazy(() => import('./views/organization/OrganizationList'));
const AddOrganization = React.lazy(() => import('./components/OrganizationForm'));
const ConsultantInfo = React.lazy(() => import('./views/consultant/ConsultantInfo'));
const Launcher = React.lazy(() => import('./views/launcher/Launcher'));
const AdminAuthPage = React.lazy(() => import('./views/admin/AdminAuthPage'));

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
      const userToken = localStorage.getItem('user');
      if (!userToken || userToken === 'undefined') {
          setIsLoggedIn(false);
      }
      setIsLoggedIn(true);
  }
  useEffect(() => {
      checkUserToken();
  }, [isLoggedIn]);



  return (
  
    <Router>
      <Suspense fallback={loading}>
        <UserProvider>
        <Routes>
        <Route element={<PrivateRoutes />}>                     
           <Route exact path="/dashboard" name="Dashboard" element={<Dashboard/>} />            
            <Route exact path="/consultant" name="Consultant Info" element={<ConsultantInfo />} />
            <Route exact path="/organization" name="Organization List" element={<OrganizationList />} />
            <Route exact path="/addorg" name="Add Organization" element={<AddOrganization />} />          
        </Route>

        <Route exact path="/" element={<Launcher/>} />
        <Route exact path="/adminauth" name="Admin Authentication" element={<AdminAuthPage />} />            
      </Routes>
        </UserProvider>
      </Suspense>
    </Router>

);
}

export default App;

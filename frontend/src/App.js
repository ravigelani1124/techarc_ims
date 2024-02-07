import React, { Component, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './scss/style.scss';
import { UserProvider } from './utils/UserContext';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Pages
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'));
const ConsultancyInfo = React.lazy(() => import('./views/consultancyInfo/ConsultancyInfo'));
const Launcher = React.lazy(() => import('./views/launcher/Launcher'));
const AdminLauncher = React.lazy(() => import('./views/admin/AdminLauncher'));

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
            <Route exact path="/" element={<Launcher />} />
            <Route exact path="/adminLauncher" name="Admin Launcher" element={<AdminLauncher />} />            
            <Route exact path="/dashboard" name="Dashboard" element={<Dashboard/>} />            
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />        
            <Route exact path="/forms/form-control" name="Forms" element={<FormControl />} />
            <Route exact path="/consultancyInfo" name="Consultancy Info" element={<ConsultancyInfo />} />            
          </Routes>  
        </UserProvider>
      </Suspense>
    </Router>
  );
}

export default App;

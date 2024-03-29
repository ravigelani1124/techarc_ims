import React, { Component, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './scss/style.scss';
import { UserProvider } from './utils/UserContext';
import PrivateRoutes from './components/PrivateRoutes';
import DashboardConsultant from './views/dashboard/DashBoardConsultant';
import UserList from './views/consultant/UserList';
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Pages
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const Dashboard = React.lazy(() => import('./views/dashboard/DashboardAdmin'));
const OrganizationList = React.lazy(() => import('./views/organization/OrganizationList'));
const AddOrganization = React.lazy(() => import('./components/OrganizationForm'));
const ConsultantList = React.lazy(() => import('./views/consultant/ConsultantList'));
const AddCounsultant = React.lazy(() => import('./components/ConsultantForm'));
const Launcher = React.lazy(() => import('./views/launcher/Launcher'));
const AdminAuthPage = React.lazy(() => import('./views/admin/AdminAuthPage'));
const AddUserPage = React.lazy(() => import('./components/AddUserForm'));
const DashboardUser = React.lazy(() => import('./views/dashboard/DashBoardUser'));
const AddApplicationUser = React.lazy(() => import('./views/application/AddApplicationUser'));
const NumberOfApplicationsUser = React.lazy(() => import('./views/application/NumberOfApplicationsUser'));
const SetConsultantAvailability = React.lazy(() => import('./views/consultant/SetConsultantAvailability'));
const BookAppointment = React.lazy(() => import('./views/user/BookAppointment'));
const MyServiceConsultant = React.lazy(() => import('./views/consultant/MyServiceConsultant'));
const ServicesList = React.lazy(() => import('./views/consultant/ServicesList'));
const ConsultantCalender = React.lazy(() => import('./views/consultant/ConsultantCalender'));
const AddApplicationType = React.lazy(() => import('./views/admin/applicationtype/AddApplicationType'));
const AddAppSubType = React.lazy(() => import('./views/admin/applicationtype/AddAppSubType'));
const DocumentList = React.lazy(() => import('./views/admin/document/DocumentList'));
const AddDocument = React.lazy(() => import('./views/admin/document/AddDocument'));
const ApplicationTypeList = React.lazy(() => import('./views/admin/applicationtype/ApplicationTypeList'));
const AllServices = React.lazy(() => import('./views/admin/applicationtype/AllServices'));
const ConsultantUtils = React.lazy(() => import('./views/consultant/ConsultantUtils'));

const News = React.lazy(() => import('./components/news'));

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
           
           {/* Admin Route */}
           <Route exact path="/admin/dashboard" name="Dashboard" element={<Dashboard/>} />                
            <Route exact path="/consultant" name="Consultant List" element={<ConsultantList />} />
            <Route exact path="/organization" name="Organization List" element={<OrganizationList />} />
            <Route exact path="/addorg" name="Add Organization" element={<AddOrganization />} />  
            <Route exact path="/addconsultant" name="Add Consultant" element={<AddCounsultant />} />   
            <Route exact path="/addapplicationtype" name="Add Application Type" element={<AddApplicationType/>} />   
            <Route exact path="/addsubtypetype" name="Add Application Sub Type" element={<AddAppSubType/>} />   
            <Route exact path="/adddocument" name="Add Document" element={<AddDocument/>} />
            <Route exact path="/documents" name="Document List" element={<DocumentList/>} />
            <Route exact path="/applicationtype" name="Application Type List" element={<ApplicationTypeList/>} />
            <Route exact path="/applicationservices" name="All Services" element={<AllServices/>} />
                        

            {/* Consultant Route */}
            <Route exact path="/consultant/dashboard" name="Dashboard" element={<DashboardConsultant/>} />     
            <Route exact path="/consultant/adduser" name="Add User" element={<AddUserPage/>} />     
            <Route exact path="/consultant/users" name="Users" element={<UserList/>} />    
            <Route exact path="/consultant/setavailality" name="SetAvailality" element={<SetConsultantAvailability/>} />     
            <Route exact path="/consultant/mycalender" name="My Calender" element={<ConsultantCalender/>} />     
            <Route exact path="/myservices" name="My Services" element={<MyServiceConsultant />} /> 
            <Route exact path="/seriveces" name="Services" element={<ServicesList />} /> 
            <Route exact path="/consultant/utilities" name="Utilities" element={<ConsultantUtils />} /> 

            {/* User Route */}
            <Route exact path="/user/dashboard" name="Dashboard" element={<DashboardUser />} />
            <Route exact path="/user/bookappointment" name="Book Appointment" element={<BookAppointment />} />
            <Route exact path="/user/addapplication" name="Add Application" element={<AddApplicationUser />} />
            <Route exact path="/user/applications" name="Applications" element={<NumberOfApplicationsUser />} />
           
        </Route>

        <Route exact path="/" element={<Launcher/>} />
        <Route exact path="/news" element={<News />} />
        <Route exact path="/adminauth" name="Admin Authentication" element={<AdminAuthPage />} />
      </Routes>
        </UserProvider>
      </Suspense>
    </Router>

);
}

export default App;

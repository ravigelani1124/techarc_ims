import React, {useContext, useEffect} from 'react';
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import UserContext from 'src/utils/UserContext';
import { useState } from 'react';



const Dashboard = () => {

  const { user } = useContext(UserContext);


  console.log("User: ", user)
  // // tableData
  // const tableData = [
  //   {
  //     email: { name: "Dhjg5@example.com" },
  //     consultantName: { name: "John" },
  //     consultancyName: { name: 'Prime Time Consultancy' },
  //     licenseNumber: { value: '123456789' },
  //     isverified: { value: 'pending' },
  //   },
  // ];

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
          {/* <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Consultant Name</CTableHeaderCell>
                <CTableHeaderCell>Consultancy Group</CTableHeaderCell>
                <CTableHeaderCell>License No.</CTableHeaderCell>
                <CTableHeaderCell>isverified</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {tableData.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell>
                    <div>{index + 1}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.email.name}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.consultantName.name}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.consultancyName.name}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.licenseNumber.value}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.isverified.value}</div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable> */}
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default Dashboard;

import React, {useContext, useEffect, useState} from 'react';
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import UserContext from 'src/utils/UserContext';
import { useNavigate } from 'react-router-dom'
import { CSpinner,} from '@coreui/react'
import ConsultantAvailabilityForm from 'src/components/ConsultantAvailabilityForm';

const SetConsultantAvailability = () => {

  useEffect(() => {
    document.title = 'Set Availability';
  }, []);

  const navigate = useNavigate()
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);


    return (
        <>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          {isLoading && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: '90vh' }}
            >
              <CSpinner />
            </div>
          )}
          <div className="body flex-grow-1 px-3">
              <div className="mb-4">
                <ConsultantAvailabilityForm />
              </div>
            </div>
          <AppFooter />
        </div>
      </>
    )
}

export default SetConsultantAvailability;
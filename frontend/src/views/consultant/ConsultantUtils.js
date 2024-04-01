import React, { useContext, useEffect, useState } from 'react';
import { DEFAULT_URL } from 'src/utils/Constant';
import UserContext from 'src/utils/UserContext';
import axios from 'axios';
import { AppFooter, AppHeader, AppSidebar } from 'src/components';
import { CSpinner } from '@coreui/react';

const ConsultantUtils = () => {
  const [consultantFees, setConsultantFees] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  // fetch consultant fees
  const fetchConsultantFees = async () => {
    setIsLoading(true);
    try {
      const jwtToken = user.jwtToken;
      const response = await axios.get(`${DEFAULT_URL}auth/consultantFees/${user._id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setConsultantFees(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Utilities';
    fetchConsultantFees();
  }, []);

  // update fees
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);
    try {
      const jwtToken = user.jwtToken;
      await axios.post(
        `${DEFAULT_URL}auth/consultantFees`,
        {
          consultant_id: user._id,
          fees: consultantFees,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      await fetchConsultantFees();
      setIsLoading(false);
      
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
          {isLoading && ( // Show spinner if loading
            <div className="position-fixed start-50 end-50 translate-middle">
              <CSpinner />
            </div>
          )}
          {alertVisible && ( // Show alert if alert is visible
            <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: '9999' }}>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="consultant_fees" className="form-label">
                Consultant Fees
              </label>
              <input
                type="number"
                className="form-control"
                id="consultant_fees"
                name="consultant_fees"
                placeholder="Set Consultant Fees"
                required
                min="0"
                autoFocus
                value={consultantFees.consultant_fees}
                onChange={(e) => setConsultantFees(e.target.value)}
              />
            </div>
            <div className="mb-3 d-flex justify-content-end">
              <button type="submit" className="btn btn-primary px-4">
                Submit
              </button>
            </div>
          </form>
        </div>
        <AppFooter />
      </div>
    </>
  );
};

export default ConsultantUtils;

import React, {useContext, useEffect,} from 'react';
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import UserContext from 'src/utils/UserContext';
import { useNavigate } from 'react-router-dom'


const AddApplicationUser = () => {

  useEffect(() => {
    document.title = 'Add Application';
  }, []);

  const navigate = useNavigate()
  const { user } = useContext(UserContext);
  
  
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
              <center>New Application</center>
            </h4>            
          </div>        
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default AddApplicationUser;

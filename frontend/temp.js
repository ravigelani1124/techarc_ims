import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

const MyPage = () => {
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('user');
    console.log('Launcher----------: ', userLoggedIn);
    if (userLoggedIn) {
      const user = JSON.parse(userLoggedIn);
      const { role } = user;

      // Navigate the user based on their role
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'consultant') {
        navigate('/consultant/dashboard');
      } else {
        // Handle other roles or unexpected cases
        navigate('/dashboard');
      }
    } else {
      // Redirect to login page if user not logged in
      navigate('/login');
    }
  }, []);

  return (
    <div>
      {/* Your page content */}
    </div>
  );
};

export default MyPage;

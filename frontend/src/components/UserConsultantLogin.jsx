import { useState } from "react";
import User from "./User";
import Consultant from "./Consultant";
import { useNavigate } from "react-router-dom";

export default function UserConsultantLogin() {
  // State to manage login status and user type
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // 'user' or 'consultant'
 
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
  };

  const handleAdminLogin = () => {
    // Navigate to the admin login route
    navigate("/adminlogin");
  };

  return (
    <>
      <div className="flex justify-center items-center">
        {isLoggedIn ? (
          <>
            {/* Render user profile or any other authenticated content */}
            <div>
              {userType === "user"
                ? "User profile content"
                : "Consultant profile content"}
            </div>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            {/* Render login forms for user and consultant */}
            <User handleLogin={() => handleLogin("user")} />

            <Consultant handleLogin={() => handleLogin("consultant")} />
          </>
        )}
      </div>
      <button
        onClick={handleAdminLogin}
        className="flex w-full justify-center items-center mt-9"
      >
        <a className="text-white font-bold py-3 px-6 rounded bg-blue-500">
          Admin Login
        </a>
      </button>{" "}
    </>
  );
}

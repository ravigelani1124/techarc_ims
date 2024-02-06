import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import "./App.css";
import Example from "./components/DashboardNav";
import AddConsultant from "./components/AddConsultant";
import AddUser from "./components/AddUser";
import AdminLogin from "./components/AdminLogin";
import AdminSignup from "./components/AdminSignUp";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Example />} />
          <Route path="/addconsultant" element={<AddConsultant />} /> 
          <Route path="/AddUser" element={<AddUser />} />   

           <Route path="/adminlogin" element={<AdminLogin />} />  
           <Route path="/adminsignup" element={<AdminSignup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
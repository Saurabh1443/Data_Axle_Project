import "./App.css";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import StickyHeadTable from "./components/Grid/LeadsGrid"; 
import PrivateRoute from "./components/PrivateRoute";
//import { MuiNavbar } from "./Navbar/navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/register" exact element={<Signup />}></Route>
          <Route path="/" exact element={
              <Dashboard />
          } ></Route>
          <Route path="/leads" exact element={<PrivateRoute>
            <StickyHeadTable />
            </PrivateRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

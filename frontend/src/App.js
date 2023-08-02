import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import StickyHeadTable from "./Grid/LeadsGrid";
import { MuiNavbar } from "./Navbar/navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <MuiNavbar />
        <Routes>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/register" exact element={<Signup />}></Route>
          <Route path="/" exact element={<Dashboard />}></Route>
          <Route path="/leads" exact element={<StickyHeadTable />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import React from "react";
import { MuiNavbar } from "../Navbar/navbar";
import Home from "./Home";
import Data from "./Data";
import Footer from "./Footer";

function Dashboard() {
  return (
    <>
      <MuiNavbar />
      <Home />
      <Data />
      <Footer />
    </>
  );
}

export default Dashboard;

import React from "react";
import { MuiNavbar } from "../Navbar/navbar";
import Home from "./Home";
import Data from "./Data";

function Dashboard() {
  return (
    <>
      <MuiNavbar />
      <Home />
      <Data />
    </>
  );
}

export default Dashboard;

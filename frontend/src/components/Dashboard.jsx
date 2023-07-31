import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      Welcome
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button>Login</Button>
      </Link>
    </div>
  );
}

export default Dashboard;

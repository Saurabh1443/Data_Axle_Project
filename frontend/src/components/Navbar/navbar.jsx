import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Button } from "@mui/material";
import logo from "../../illustrations/logo.png";
import { Link } from "react-router-dom";

export const MuiNavbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          gap: "75%",
          borderBottom: 1,
          borderColor: "#C5C5C5",
        }}
      >
        <Toolbar>
          <img src={logo} alt="logo" height="70px"></img>
        </Toolbar>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button
            size="medium"
            sx={{
              borderRadius: "15px",
              color: "#ffffff",
              padding: "5px",
              backgroundColor: "black",
              fontFamily: "Lato",
              marginTop: "20px",
              "&:hover": {
                backgroundColor: "#555444",
              },
            }}
          >
            Login
          </Button>
        </Link>
      </AppBar>
    </Box>
  );
};

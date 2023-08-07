import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Button } from "@mui/material";
import logo from "../../illustrations/logo.png";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";

export const MuiNavbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("email");
    window.location.reload();
  };
  const isDashboardRoute = window.location.pathname == "/leads";
  console.log(isDashboardRoute);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottom: 1,
          borderColor: "#C5C5C5",
        }}
      >
        <Toolbar>
          <div>
            <img src={logo} alt="logo" height="70px"></img>

            {isDashboardRoute && (
              <Link to="/" style={{ textDecoration: "none" }}>
                <HomeIcon
                  style={{
                    marginLeft: "940px",
                    marginBottom: "16px",
                    cursor: "pointer",
                  }}
                  fontSize="large"
                  color="success"
                />
              </Link>
            )}
          </div>
        </Toolbar>
        {!localStorage.getItem("email") ? (
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
                marginRight: "20px",
                "&:hover": {
                  backgroundColor: "#555444",
                },
              }}
            >
              Login
            </Button>
          </Link>
        ) : (
          <LogoutIcon
            onClick={handleLogout}
            style={{
              marginTop: "18px",
              marginRight: "20px",
              cursor: "pointer",
            }}
            fontSize="large"
            color="success"
          />
        )}
      </AppBar>
    </Box>
  );
};

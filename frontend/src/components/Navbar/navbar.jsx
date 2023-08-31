import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Button, Tooltip } from "@mui/material";
import logo from "../../illustrations/logo.png";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
export const MuiNavbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("email");
    window.location.reload();
  };
  const isDashboardRoute = window.location.pathname == "/";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#C5C5C5", //#8b9dc3
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottom: 1,
          borderColor: "#C5C5C5",
        }}
      >
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={logo} alt="logo" height="70px"></img>
          </Link>
        </Toolbar>
        <div>
          {!isDashboardRoute && (
            <>
              <Tooltip title="Sent mails" cursor="pointer">
                <Link to="/all/emails" style={{ textDecoration: "none" }}>
                  <EmailIcon
                    style={{
                      marginTop: "18px",
                      cursor: "pointer",
                      color: "#000000",
                    }}
                    fontSize="large"
                  />
                </Link>
              </Tooltip>

              <Tooltip title="All leads" cursor="pointer">
                <Link to="/leads" style={{ textDecoration: "none" }}>
                  <HomeIcon
                    style={{
                      marginTop: "18px",
                      marginLeft: "40px",
                      color: "#000000",
                      cursor: "pointer",
                    }}
                    fontSize="large"
                  />
                </Link>
              </Tooltip>
            </>
          )}
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
            <Tooltip title="Logout" cursor="pointer">
              <LogoutIcon
                onClick={handleLogout}
                style={{
                  marginTop: "18px",
                  marginRight: "20px",
                  marginLeft: "40px",
                  cursor: "pointer",
                  color: "#000000",
                }}
                fontSize="large"
              />
            </Tooltip>
          )}
        </div>
      </AppBar>
    </Box>
  );
};

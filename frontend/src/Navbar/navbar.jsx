import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";

export const MuiNavbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          {/* <img src={data_axle_genie} alt="logo"></img> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Data Axle SalesGenie
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

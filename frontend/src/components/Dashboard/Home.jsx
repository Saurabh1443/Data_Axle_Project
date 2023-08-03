import React from "react";
import dataaxle from "../../illustrations/dataaxle.png";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container>
      <Typography display="flex" flexDirection="row" gap="30%" marginTop={8}>
        <Box sx={{ marginTop: "10px" }}>
          <h1>
            Data Axle powers your <br />
            <span style={{ color: "purple" }}>Marketing.</span>
            <br />
            <span style={{ color: "green" }}>Product.</span>
            <br />
            <span style={{ color: "#839192" }}>Fundraising.</span>
          </h1>
          <h3 marginTop="50px">
            Bringing data to life with 50 years of experience
          </h3>
          <Link
            to="https://www.data-axle.com/contact-us/"
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                borderRadius: 28,
                color: "#ffffff",
                backgroundColor: "black",
                fontFamily: "Lato",
                marginTop: "10px",
                "&:hover": {
                  backgroundColor: "#555444",
                },
              }}
            >
              Find out how
            </Button>
          </Link>
        </Box>
        <img src={dataaxle} alt="" height="400px" />
      </Typography>
    </Container>
  );
}

export default Home;

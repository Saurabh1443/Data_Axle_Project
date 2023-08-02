import { Card, CardHeader, Typography } from "@mui/material";
import React from "react";
import marketing from "../illustrations/marketing.svg";
import fundraising from "../illustrations/fundraising.svg";
import product from "../illustrations/product.svg";

const style = {
  root: {
    textAlign: "center",
    fontFamily: "Lato",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)", // Adjust the shadow as per your requirement
  },
  image: {
    height: "200px",
    width: "auto",
  },
};

function Data() {
  return (
    <div style={{ marginTop: "70px" }}>
      <h1 style={style.root}>Powerful Data and Solutions</h1>
      <Typography
        display="flex"
        gap={4}
        marginLeft={10}
        marginRight={10}
        marginTop={5}
        marginBottom={10}
      >
        <Card style={style.card}>
          <img src={marketing} alt="" style={style.image}></img>
          <CardHeader
            title="Marketing"
            subheader="Use our data to create a strategic marketing program that targets high value prospects with compelling creative."
          />
        </Card>
        <Card style={style.card}>
          <img src={product} alt="" style={style.image}></img>
          <CardHeader
            title="Product"
            subheader="Our data gives you the coverage, accuracy and recency you need to create a product that exceeds the needs of your customers"
          />
        </Card>
        <Card style={style.card}>
          <img src={fundraising} alt="" style={style.image}></img>
          <CardHeader
            title="Fundraising"
            subheader="We expand your donor universe and create an experience that invites your target audience to invest in the mission of your nonprofit"
          />
        </Card>
      </Typography>
    </div>
  );
}

export default Data;

import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import { MuiNavbar } from "../Navbar/navbar";
import Footer from "../Dashboard/Footer";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";

export default function AllMails() {
  const [rows, setRows] = useState([]);
  const [gridLoading, setGridLoading] = useState(false);
  const [totalEntries, setTotalEntries] = useState("");

  const columns = [
    { field: "receiverEmail", headerName: "Receiver Mail", width: 270 },
    { field: "subject", headerName: "Subject", width: 300 },
    { field: "message", headerName: "Message", width: 520 },
    {
      field: "sendAt",
      headerName: "Sent At",
      width: "max-content",
      renderCell: (vv) => {
        return <>{vv?.formattedValue?.split("T")?.[0]}</>;
      },
    },
  ];

  useEffect(() => {
    setGridLoading(true);
    const handleApiCall = async () => {
      try {
        const apiUrl = `http://127.0.0.1:8000/api/persons/getMail`;
        const response = await fetch(apiUrl);
        const { result, error, success } = await response.json();

        setTotalEntries(result?.length);
        setRows(result);
      } catch (error) {
        console.log(error);
      }
      setGridLoading(false);
    };
    handleApiCall();
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <MuiNavbar />
      <Grid
        container
        spacing={3}
        sx={{
          mt: 10,
        }}
      >
        {rows?.map((vv, index) => {
          return (
            <Grid key={index} item xs={3}>
              <Card sx={{ maxWidth: "75%", ml: 3 }}>
                <CardHeader subheader={vv?.receiverEmail}></CardHeader>
                <CardContent></CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Footer />
    </Paper>
  );
}

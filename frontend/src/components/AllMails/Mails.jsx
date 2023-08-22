import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import _ from "lodash";
import { MuiNavbar } from "../Navbar/navbar";
import Footer from "../Dashboard/Footer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from '@mui/material/Divider';
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from '@mui/material/ListItemButton';
import Grid from '@mui/material/Grid';

export default function AllMails() {
  const [rows, setRows] = useState([]);
  const [gridLoading, setGridLoading] = useState(false);
  const [totalEntries, setTotalEntries] = useState("");
  const [emailDetails, setEmailDetails] = useState({})
  const [selectedIndex ,setSelectedIndex] = useState(-1)


  const handleEmailClick = (vv,id) => {
    setSelectedIndex(id);
    setEmailDetails(vv)
  }
  

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
      <Grid container spacing={2}>
        <Grid item xs={6}>
        <Paper>
      <List sx={{ mt: 10 ,ml:4 }}>
        {rows?.map((vv) => (
          <>
            <ListItem key={vv?.id} disablePadding>
              <ListItemButton selected={selectedIndex ===vv?.id} onClick={() => handleEmailClick(vv, vv?.id)} >
                <ListItemText primary={vv?.receiverEmail} secondary={vv?.subject} />
                </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
          </List>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper >
            {selectedIndex ? (<><box><h1>{emailDetails?.subject}</h1></box></>):(<></>)}
          </Paper>
        </Grid>
        </Grid>
      <Footer />
    </Paper>
  );
}

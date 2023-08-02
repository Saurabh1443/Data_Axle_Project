import Drawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import SmartToyTwoToneIcon from "@mui/icons-material/SmartToyTwoTone";
import React, { useState } from "react";
import { emailField } from "../staticData";

import {
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { blue, grey, red } from "@mui/material/colors";
import { columnGroupsStateInitializer } from "@mui/x-data-grid/internals";

export const GridDrawer = ({ open, handleClose }) => {
  const [product, setProduct] = useState("");
  const [emailTone, setEmailTone] = useState("");
  const [emailDescriptiion, setEmailDescription] = useState("");
  const handleProductChange = (event) => {
    setProduct(event.target.value);
  };

  // Function to handle select dropdown change
  const handleEmailToneChange = (event) => {
    setEmailTone(event.target.value);
  };
  
  const fetchDataFromAPI = async () => {
    try {
      const apiUrl = `http://127.0.0.1:8000/api/persons`;
      const response = await fetch(apiUrl);
      const responseJson = await response.json();
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = (event) => {
    const email_description = emailField?.find(
      (vv) => vv?.email_tone === emailTone
    );

    //console.log(product, emailTone, " ", email_description);
    event.preventDefault();
    fetchDataFromAPI(product,)

  };

  return (
    <Drawer
      variant="persistent"
      PaperProps={{
        sx: {
          width: "30%",
          top: "128px",
          //height: "90%",
        },
      }}
      anchor={"right"}
      open={open}
      onClose={handleClose}
    >
      <Paper sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
        <Box sx={{ width: "100%", height: 100, border: 1 }}>
          <SmartToyTwoToneIcon
            display={"inline"}
            sx={{ ml: 4, mt: 3, mr: 1.5 }}
          />
          <Typography variant="h5" display={"inline"} fontWeight={400}>
            Genie-Ai
          </Typography>
          <Typography fontSize={12} ml={9}>
            Let our Genie AI assist you in <br />
            “Generating personalised email content”.
          </Typography>

          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Paper
          variant="outlined"
          square
          sx={{
            m: "2%",
            height: "80%",
          }}
        >
          <Typography fontWeight={500} ml={3} mt={2}>
            Let us know some more details
          </Typography>
          <Typography fontWeight={300} ml={3} mt={2}>
            1. Describe product you want to market?*
          </Typography>
          {/* onSubmit={handleSubmit} */}
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              //label="Headphone , Insurance,etc"
              placeholder="Headphone,Insurance,etc"
              variant="outlined"
              sx={{ ml: 5, mt: 2, minWidth: 270 }}
              onChange={handleProductChange}
            />
            <Typography fontWeight={300} ml={3} mt={2}>
              2. Select a tone for Email content*
            </Typography>
            {/* <InputLabel id="demo-simple-select-helper-label">Age</InputLabel> */}
            <FormControl sx={{ ml: 5, mt: 2, minWidth: 270 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Select Email Tone
              </InputLabel>
              <Select
                //labelId="demo-simple-select-helper-label"
                id="email-tone"
                value={emailTone}
                label="Select Email Tone"
                onChange={handleEmailToneChange}
              >
                {emailField?.map((vv, ind) => {
                  return (
                    <MenuItem key={ind} value={`${vv.email_tone}`}>
                      <em>{vv.email_tone}</em>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              type="submit"
              color="inherit"
              sx={{ ml: 20, mt: 4 }}
            >
              Generate Email
            </Button>
          </form>
        </Paper>
      </Paper>
    </Drawer>
  );
};

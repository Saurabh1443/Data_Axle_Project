import Drawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import SmartToyTwoToneIcon from "@mui/icons-material/SmartToyTwoTone";
import React, { useState } from "react";
import { emailField } from "../staticData";
import { ResEmail } from "./ResponseEmail";
import { ToastContainer, toast } from "react-toastify";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 2 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const GridDrawer = ({ open, handleClose, personId }) => {
  const [product, setProduct] = useState("");
  const [emailTone, setEmailTone] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMail, setResponseMail] = useState(false); //false
  const [emailResponse, setEmailResponse] = useState("");

  const handleProductChange = (event) => {
    setProduct(event.target.value);
  };

  // Function to handle select dropdown change
  const handleEmailToneChange = (event) => {
    setEmailTone(event.target.value);
  };

  const fetchDataFromAPI = async (email_description) => {
    try {
      console.log(personId);
      const apiUrl = `http://127.0.0.1:8000/api/persons/generateEmail/${personId}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_description: product,
          email_tone: emailTone,
          email_description: email_description,
        }),
      });

      const { result, error, success } = await response.json();
      if (!success) {
        setResponseMail(false);
        toast.error(error?.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      } else {
        setEmailResponse(result);
        setResponseMail(true);
        // setEmailResponse(result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (event) => {
    const email = emailField?.find((vv) => vv?.email_tone === emailTone);

    event.preventDefault();
    try {
      setLoading(true);
      console.log(email?.email_description);
      await fetchDataFromAPI(email?.email_description);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Drawer
      variant="persistent"
      PaperProps={{
        sx: {
          width: "50%",
          top: "128px",
          //height: "90%",
        },
      }}
      //onClose={handleClose}
      anchor={"right"}
      open={open}
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
            onClick={async () => {
              setProduct("");
              setEmailTone("");
              setResponseMail(false);
              await handleClose();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {loading ? (
          <>
            <CircularProgress
              sx={{ display: "block", margin: "auto", mt: 4 }}
            />
            <Typography fontWeight={500} m={5}>
              Grab a cup of coffee while we generate the email for you...
            </Typography>
          </>
        ) : responseMail ? (
          <ResEmail emailResponse={emailResponse}></ResEmail>
        ) : (
          <>
            <Paper
              variant="outlined"
              square
              sx={{
                m: "2%",
                height: "80%",
              }}
            >
              {/* yaha cond render krna hai */}

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
                  required
                  value={product}
                  sx={{ ml: 5, mt: 2, minWidth: 270 }}
                  onChange={handleProductChange}
                />
                <Typography fontWeight={300} ml={3} mt={2}>
                  2. Select a tone for Email content*
                </Typography>
                {/* <InputLabel id="demo-multiple-name-label">Age</InputLabel> */}
                <FormControl sx={{ ml: 5, mt: 2, minWidth: 270 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Select Email Tone
                  </InputLabel>
                  <Select
                    //labelId="demo-simple-select-helper-label"
                    id="email-tone"
                    required
                    value={emailTone}
                    label="Select Email Tone"
                    onChange={handleEmailToneChange}
                    MenuProps={MenuProps}
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

              {/* yaha tak  */}
            </Paper>
          </>
        )}
      </Paper>
      <ToastContainer />
    </Drawer>
  );
};

import Drawer from "@mui/material/Drawer";

import Paper from "@mui/material/Paper";

import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import Box from "@mui/material/Box";

import CircularProgress from "@mui/material/CircularProgress";

import React, { useEffect, useState } from "react";

import { emailField } from "../../staticData";

import { ResEmail } from "./ResponseEmail";

import { ToastContainer, toast } from "react-toastify";

import dataaxle_logo from "../../illustrations/dataaxle_logo.png";

import { loadingMessages } from "../../staticData";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import AutorenewIcon from "@mui/icons-material/Autorenew";

import {
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  CardActions,
  Tooltip,
} from "@mui/material";

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

  const [responseMail, setResponseMail] = useState(false);

  const [emailResponse, setEmailResponse] = useState([]);

  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const [index, setIndex] = useState(0);

  const [isCopied, setIsCopied] = useState(false);

  const [dialog, setDialog] = useState(false);

  const handleProductChange = (event) => {
    setProduct(event.target.value);
  };

  const handleEmailToneChange = (event) => {
    setEmailTone(event.target.value);
  };

  const handleSetDialog = () => {
    setDialog((dialog) => !dialog);
  };

  useEffect(() => {
    let interval;

    const changeLoadingMessage = () => {
      setLoadingMessageIndex(
        (prevIndex) => (prevIndex + 1) % loadingMessages.length
      );
    };

    setLoadingMessageIndex(0);

    interval = setInterval(changeLoadingMessage, 7000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchDataFromAPI = async (event) => {
    try {
      event.preventDefault();

      setLoading(true);

      const email = emailField?.find((vv) => vv?.email_tone == emailTone);

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

          email_description: email?.email_description,
        }),
      });

      const { result, error, success } = await response.json();

      setLoading(false);

      if (!success) {
        setResponseMail(false);

        toast.error(error?.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });

        return;
      } else {
        if (result?.length > 0) {
          let filteredData = [];

          for (let vv of result) {
            filteredData.push(JSON.parse(vv));
          }

          setEmailResponse(filteredData);
        } else {
          setEmailResponse([]);
        }

        setResponseMail(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBackToMain = () => {
    setResponseMail((responseMail) => !responseMail);

    setIndex(0);
  };

  const handleGoBack = () => {
    setIsCopied(false);

    setIndex((index) => index - 1);
  };

  const handleSubmit = () => {
    try {
      setIsCopied(false);

      setIndex((index) => (index + 1) % 5);

      setLoading(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Drawer
        variant="persistent"
        PaperProps={{
          sx: {
            width: "30vw",

            top: "135px",
          },
        }}
        anchor={"right"}
        open={open}
      >
        <Paper
          sx={{
            width: "100%",

            height: "100%",

            overflow: "hidden",

            backgroundColor: "#F5F5F5",
          }}
        >
          <Box
            sx={{
              width: "100%",

              height: 90,

              mb: 0,
            }}
          >
            <Typography display="flex" ml={2.5} mt={1}>
              <img
                src={dataaxle_logo}
                height="40px"
                width="40px"
                alt="Data Axle"
              />

              <Typography
                variant="h5"
                display={"inline"}
                fontWeight={400}
                margin="5px"
              >
                Genie-AI
              </Typography>
            </Typography>

            <Typography fontSize={12} ml={4.5}>
              Let our Genie AI assist you in <br />
              <Typography fontSize={14}>
                “Generating personalised email content”.
              </Typography>
            </Typography>

            <IconButton
              sx={{
                position: "absolute",

                top: 8,

                right: 8,
              }}
              onClick={() => {
                setProduct("");

                setEmailTone("");

                setResponseMail(false);

                setIndex(0);

                handleClose();
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
                {loadingMessages[loadingMessageIndex]}
              </Typography>
            </>
          ) : responseMail ? (
            <ResEmail
              setIsCopied={setIsCopied}
              isCopied={isCopied}
              index={index}
              emailResponse={emailResponse}
              dialog={dialog}
              setDialog={setDialog}
            >
              <CardActions
                sx={{
                  display: "flex",

                  justifyContent: "space-between",

                  marginTop: "-6px",
                }}
              >
                <Tooltip title="Previous response">
                  <ArrowCircleLeftIcon
                    variant="outlined"
                    onClick={handleGoBack}
                    color={`${index == 0 ? "disabled" : "success"}`}
                    fontSize="large"
                    cursor="pointer"
                    Tool
                  />
                </Tooltip>

                <Tooltip title="Regenerate response">
                  <AutorenewIcon
                    variant="outlined"
                    color={`${index == 4 ? "disabled" : "success"}`}
                    fontSize="large"
                    onClick={handleSubmit}
                    cursor="pointer"
                  />
                </Tooltip>

                <Button
                  variant="outlined"
                  onClick={handleBackToMain}
                  color="inherit"
                  style={{ padding: "0px 8px" }}
                >
                  New <br /> Content
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleSetDialog}
                  sx={{
                    color: "#ffffff",

                    backgroundColor: "green",
                  }}
                >
                  Send Email
                </Button>
              </CardActions>
            </ResEmail>
          ) : (
            <>
              <Paper
                variant="outlined"
                square
                sx={{
                  m: "2%",

                  mt: "0%",

                  height: "80%",
                }}
              >
                <Typography fontWeight={500} ml={3} mt={2}>
                  Let us know some more details
                </Typography>

                <Typography fontWeight={300} ml={3} mt={2}>
                  1. Describe product you want to market?*
                </Typography>

                <form onSubmit={fetchDataFromAPI}>
                  <TextField
                    error={product !== "" && product?.split(" ")?.length <= 2}
                    helperText={"Description should have atleast 3 words"}
                    id="outlined-basic"
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

                  <FormControl sx={{ ml: 5, mt: 2, minWidth: 270 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Select Email Tone
                    </InputLabel>

                    <Select
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
                    sx={{ ml: 20, mt: 2 }}
                  >
                    Generate Email
                  </Button>
                </form>
              </Paper>
            </>
          )}
        </Paper>
        <ToastContainer />
      </Drawer>
    </>
  );
};

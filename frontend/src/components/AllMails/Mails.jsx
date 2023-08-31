import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { MuiNavbar } from "../Navbar/navbar";
import Footer from "../Dashboard/Footer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import { Dialog, 
  IconButton, 
  Tooltip, 
  Typography, 
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
  Box,
  Stack, } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ToastContainer, toast } from "react-toastify";
import { sendEmailAttachement, validateReceiverEmailAddress } from "../../emailHandler";
import { CleaningServices } from "@mui/icons-material";

export default function AllMails() {
  const [rows, setRows] = useState([]);
  const [gridLoading, setGridLoading] = useState(false);
  const [totalEntries, setTotalEntries] = useState("");
  const [emailDetails, setEmailDetails] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(false);
  const [open, setOpen] = useState(false);
  const[dialog,setDialog] = useState(false)
  const [receiverEmail, setReceiverEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const[searchSubject,setSearchSubject] = useState("")

  const handleEmailClick = (vv, id) => {
    setSelectedIndex(id);
    setEmailDetails(vv);
    setMessage(vv?.message);
    setSubject(vv?.subject)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(true);

    if (await validateReceiverEmailAddress(receiverEmail)) {
      const response = await sendEmailAttachement(receiverEmail,subject,message)
      const { error, success } = await response.json();
      setOpen(false);

      if (success) {
        toast.success("Email successfully sent", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(error?.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setDialog((dialog) => !dialog);
    } else {
      setOpen(false);
      toast.error("Given email address does not exist in the real world", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleDelete =async()=>{
   
    try {
      setGridLoading(true);
      const apiUrl = `http://127.0.0.1:8000/api/persons/mail/delete/${emailDetails?.id}`;
      const response = await fetch(apiUrl,{ method: 'DELETE' });
      const { result, error, success } = await response.json();

       if(success){
        toast.success("Attachement deleted successfully",{
          position: toast.POSITION.TOP_RIGHT,
        })
        setEmailDetails({})
        setSelectedIndex(false)
       await handleApiCall()
       }
    } catch (error) {
      console.log(error);
    }
    finally{
      setGridLoading(false);
    }
   
  }
  const handleApiCall = async () => {
    setGridLoading(true);
    try {
      const apiUrl = `http://127.0.0.1:8000/api/persons/getMail?subject=${searchSubject}`;
      const response = await fetch(apiUrl);
      const { result, error, success } = await response.json();

      setTotalEntries(result?.length);
      setRows(result);
    } catch (error) {
      console.log(error);
    }
    finally{
      setGridLoading(false);
    }
  };

  useEffect(() => {
     handleApiCall();
  }, [searchSubject]);

  return (
    <> 
    <Paper sx={{ width: "100%", mt: 10 }}>
      <MuiNavbar />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          
          <Paper sx={{ maxHeight: "100vh", overflow: "auto" }}>
          <Typography fontSize={20} sx={{ml:4}}>Sent Items</Typography>
          <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              placeholder="Search By Email's subject "
              sx={{ width: 450,ml:2 }}
              onChange={(e) => setSearchSubject(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Stack paddingRight={"20px"}>
                    {/* <SearchIcon color="disabled" fontSize="medium" /> */}
                  </Stack>
                ),
              }}
            /> 
            <List sx={{ ml: 1 }}>
              {rows?.map((vv) => (
                <>
                  <ListItem key={vv?.id} disablePadding>
                    <ListItemButton
                      selected={selectedIndex === vv?.id}
                      onClick={() => handleEmailClick(vv, vv?.id)}
                    >
                      <ListItemText
                        primary={vv?.receiverEmail}
                        secondary={vv?.subject}
                      />
                      <ListItemText
                       primary = {vv?.sendAt?.split("T")?.[0]}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ height: "100vh" }}>
            {selectedIndex ? (
              <>
                <box>
                  <Typography fontWeight={700} mb={3} pt={2} pl={1}>
                    {emailDetails?.subject}
                  </Typography>
                </box>
                <Typography fontWeight={500} mb={3} pt={2} pl={1}>
                  Receiver's Email : {emailDetails?.receiverEmail}
                </Typography>
                <Typography fontWeight={350} pl={1}>
                  {emailDetails?.message}
                </Typography>
                <box
                  style={{ position: "absolute", bottom: "2px", right: "2px" ,display:"flex",gap:10}}
                >
                  <Tooltip title="Delete Mail" cursor="pointer"  color="error">
                    <DeleteOutlineIcon onClick = {()=>handleDelete()} fontSize="large" />
                  </Tooltip>
                  <Tooltip cursor="pointer" title="Use Template"  color="success">
                    <ArrowForwardIcon onClick = {()=>setDialog(true)}  fontSize="large" />
                  </Tooltip>
                </box>
              </>
            ) : (
              <>
              <Box style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
               Your email details will display here....
              </Box>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </Paper>
    <Dialog
    open={dialog}
    sx={{ width: "80%", maxWidth: 600, margin: "0 auto" }}
  >
    <IconButton
      sx={{
        position: "absolute",
        top: 8,
        right: 8,
      }}
      onClick={() => {
         setDialog(false);
      }}
    >
      <CloseIcon />
    </IconButton>
    <DialogTitle>Send an email attachment</DialogTitle>
    <DialogContent>
      <form onSubmit={handleSubmit} autoComplete="off">
        <TextField
          required
          fullWidth
          style={{ marginBottom: "10px", marginTop: "10px" }}
          value={receiverEmail}
          onChange={(e) => setReceiverEmail(e.target.value)}
          id="email"
          label="Receiver Email address"
          name="receiverEmail"
          type="email"
        />
        <TextField
          required
          fullWidth
          style={{ marginBottom: "10px" }}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          name="subject"
          label="Subject"
          type="text"
          id="subject"
        />
        <TextField
          required
          fullWidth
          style={{ marginBottom: "10px" }}
          value={message}
          minRows={7}
          multiline={true}
          onChange={(e) => setMessage(e.target.value)}
          name="message"
          label="Message"
          type="text"
          id="subject"
        />

        <Button
          variant="contained"
          size="large"
          type="submit"
          sx={{
            borderRadius: 28,
            color: "#ffffff",
            backgroundColor: "green",
            fontFamily: "Lato",
            marginTop: "5px",
            marginLeft: "20px",
          }}
        >
          send email
        </Button>
      </form>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </DialogContent>
  </Dialog>
  <ToastContainer />
  </>
    
  );
}

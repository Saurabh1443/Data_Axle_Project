import Card from "@mui/material/Card";
import {
  Button,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopyRounded";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const ResEmail = ({
  emailResponse,
  children,
  index,
  isCopied,
  setIsCopied,
  dialog,
  setDialog,
}) => {
  const [receiverEmail, setReceiverEmail] = useState("");
  const [subject, setSubject] = useState(emailResponse?.[index]?.subject);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleCopyToClipboard = () => {
    const emailText = getEmailText();
    navigator.clipboard.writeText(emailText);
    setIsCopied(true);
  };

  const validateReceiverEmailAddress = async (targetEmail) => {
    try {
      let data = await fetch(
        `https://emailvalidation.abstractapi.com/v1/?api_key=53d485e88c164ab1bc24a62b7960cf98&email=${targetEmail}`
      );
      let response = await data.json();
      console.log(response);
      if (response?.is_smtp_valid?.value) {
        return true;
      } else {
        return false;
      }
    } catch {}
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(true);

    if (await validateReceiverEmailAddress(receiverEmail)) {
      const apiUrl = `http://127.0.0.1:8000/api/persons/sendEmail`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ receiverEmail, subject, message }),
      });
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
  const getEmailText = () => {
    const contentArray = [
      // emailResponse?.[index]?.subject,
      emailResponse?.[index]?.para1,
      emailResponse?.[index]?.para2,
      emailResponse?.[index]?.para3,
      emailResponse?.[index]?.para4,
      emailResponse?.[index]?.regards,
    ];

    return contentArray.filter(Boolean).join("\n");
  };

  const setDialogClose = () => {
    setDialog(false);
  };

  useEffect(() => {
    let tempMessage = getEmailText();
    setReceiverEmail("");
    setMessage(tempMessage);
  }, [index]);
  return (
    <>
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
            setDialogClose();
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
      <Card
        square
        sx={{
          m: "0%",
          mb: "10%",
          height: "70%",
          width: "96%",
          overflow: "hidden",
          backgroundColor: "#F5F5F5",
        }}
      >
        <Card
          variant="outlined"
          square
          sx={{
            m: "2%",
            height: "65%",
            width: "95%",
            overflow: "auto",
            position: "relative",
            p: 1,
          }}
        >
          <div style={{ display: "flex" }}>
            <h4>Subject: </h4>
            <Typography fontSize={15} fontWeight={400} m={1} mt={2.9}>
              {emailResponse?.[index]?.subject}
            </Typography>
          </div>

          <div style={{ wordBreak: "break-word", wordSpacing: "2px" }}>
            <Typography fontSize={15} fontWeight={350} m={1} mt={2.9}>
              {emailResponse?.[index]?.para1}
            </Typography>
          </div>
          <div style={{ wordBreak: "break-word", wordSpacing: "2px" }}>
            <Typography fontSize={15} fontWeight={350} m={1} mt={2.9}>
              {emailResponse?.[index]?.para2}
            </Typography>
          </div>
          <div style={{ wordBreak: "break-word", wordSpacing: "2px" }}>
            <Typography fontSize={15} fontWeight={350} m={1} mt={2.9}>
              {emailResponse?.[index]?.para3}
            </Typography>
          </div>
          <div style={{ wordBreak: "break-word", wordSpacing: "2px" }}>
            <Typography fontSize={15} fontWeight={350} m={1} mt={2.9}>
              {emailResponse?.[index]?.para4}
            </Typography>
          </div>
          <br />
          <div style={{ wordBreak: "break-word", wordSpacing: "2px" }}>
            <Typography fontSize={15} fontWeight={350} m={1} mt={2.9}>
              {emailResponse?.[index]?.regards}
            </Typography>
          </div>
          <Tooltip title="Copy To Clipboard" placement="left">
            <Button
              //variant="outlined"
              color="primary"
              size="large"
              onClick={handleCopyToClipboard}
              disabled={isCopied}
              sx={{
                position: "sticky",
                ml: "88%",
                bottom: 0,
                minWidth: 0,
                p: 1,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              {isCopied ? (
                <>
                  <DoneOutlineRoundedIcon size={"large"} />
                </>
              ) : (
                <>
                  <ContentCopyIcon
                    onClick={handleCopyToClipboard}
                    size={"large"}
                  />
                </>
              )}
            </Button>
          </Tooltip>
        </Card>
        {children}
      </Card>
      <ToastContainer />
    </>
  );
};

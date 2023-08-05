import Card from "@mui/material/Card";
import { Button, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopyRounded";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";

export const ResEmail = ({ emailResponse, children }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    const emailText = getEmailText();
    navigator.clipboard.writeText(emailText);
    setIsCopied(true);
  };

  const getEmailText = () => {
    const contentArray = [
      emailResponse?.subject,
      emailResponse?.para1,
      emailResponse?.para2,
      emailResponse?.para3,
      emailResponse?.para4,
      emailResponse?.regards,
    ];

    return contentArray.filter(Boolean).join("\n");
  };
  return (
    <Card
      square
      sx={{
        m: "2%",
        mb: "4%",
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
          height: "70%",
          width: "95%",
          overflow: "auto",
          position: "relative",
          p: 1,
        }}
      >
        <div style={{ display: "flex" }}>
          <h4>Subject: </h4>
          <Typography fontSize={15} fontWeight={400} m={1} mt={2.9}>
            {emailResponse?.subject}
          </Typography>
        </div>

        <div style={{ wordBreak: "break-word", wordSpacing: "2px" }}>
          <Typography fontSize={15} fontWeight={350} m={1} mt={2.9}>
            {emailResponse?.para1}
          </Typography>
        </div>
        <div style={{ wordBreak: "break-word", wordSpacing: "2px" }}>
          <Typography fontSize={15} fontWeight={350} m={1} mt={2.9}>
            {emailResponse?.para2}
          </Typography>
        </div>
        <div style={{ wordBreak: "break-word", wordSpacing: "2px" }}>
          <Typography fontSize={15} fontWeight={350} m={1} mt={2.9}>
            {emailResponse?.para3}
          </Typography>
        </div>
        <div style={{ wordBreak: "break-word", wordSpacing: "2px" }}>
          <Typography fontSize={15} fontWeight={350} m={1} mt={2.9}>
            {emailResponse?.para4}
          </Typography>
        </div>
        <br />
        <div style={{ wordBreak: "break-word", wordSpacing: "2px" }}>
          <Typography fontSize={15} fontWeight={350} m={1} mt={2.9}>
            {emailResponse?.regards}
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
  );
};

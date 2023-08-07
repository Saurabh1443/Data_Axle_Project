import Card from "@mui/material/Card";
import { Button, Tooltip, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopyRounded";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";

export const ResEmail = ({ emailResponse, children,index,isCopied,setIsCopied }) => {
  
  const handleCopyToClipboard = () => {
    const emailText = getEmailText();
    navigator.clipboard.writeText(emailText);
    setIsCopied(true);
  };

  const getEmailText = () => {
    const contentArray = [
      emailResponse?.[index]?.subject,
      emailResponse?.[index]?.para1,
      emailResponse?.[index]?.para2,
      emailResponse?.[index]?.para3,
      emailResponse?.[index]?.para4,
      emailResponse?.[index]?.regards,
    ];

    return contentArray.filter(Boolean).join("\n");
  };
  return (
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
  );
};

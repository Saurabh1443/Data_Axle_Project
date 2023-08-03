import Card from "@mui/material/Card";
import { Paper, TextField, Typography } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Tabs } from "@mui/base";
import { ThemeProvider } from "@emotion/react";

export const ResEmail = ({ emailResponse }) => {
  return (
    <Card sx={{ m: "2%", mb: "10%", height: "70%", width: "200%" ,}}>
      <Paper
        variant="outlined"
        square
        sx={{
          m: "2%",
          height: "70%",
          width: "max-content",
          overflow: "auto",
        }}
      >
        <span style={{ display: "flex" }}>
          <h4>Subject : </h4>{" "}
          <Typography fontSize={14} fontWeight={400} m={1} mt={2.9}>
            {emailResponse?.subject}
          </Typography>
        </span>

        <div style={{ wordBreak: "break-word", wordSpacing: "2px" }}>
          {emailResponse?.para1}
        </div>
        <div style={{ wordBreak: "break-word", wordSpacing: "2px" }}>
          {emailResponse?.para2}
        </div>
        <div style={{ wordBreak: "break-word", wordSpacing: "2px" }}>
          {emailResponse?.para3}
        </div>
        <div style={{ wordBreak: "break-word", wordSpacing: "2px" }}>
          {emailResponse?.para4}
        </div>
        <br />
        <div style={{ wordBreak: "break-word", wordSpacing: "2px" }}>
          {emailResponse?.regards}
        </div>
      </Paper>
    </Card>
  );
};

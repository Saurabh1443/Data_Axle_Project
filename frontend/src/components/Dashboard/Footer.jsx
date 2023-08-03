import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,
        mt: 1,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Data Axle helps businesses make and save money through data,
              technology, and services
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              13155 Noel Road, Suite 1750, Dallas, TX 75240
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: reference@data-axle.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 800 808 1113
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/DataAxle/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/dataaxle/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://twitter.com/Data_Axle" color="inherit">
              <Twitter />
            </Link>

            <Link
              href="https://www.youtube.com/@dataaxle"
              sx={{ pl: 1, pr: 1 }}
              color="inherit"
            >
              <YouTube />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {" © 2023 Data Axle, All Rights Reserved"}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

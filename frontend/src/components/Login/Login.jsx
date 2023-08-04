import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import login_bg from "../../illustrations/login_bg.svg";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import { useNavigate , useParams } from "react-router-dom";


const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const center = {
  position: "relative",
  top: "50%",
  left: "37%",
};

export default function Login() {
  const [setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const {next} = useParams()

  const handleSubmit = async (event) => {
    event.preventDefault();
    {
      const apiUrl = `http://127.0.0.1:8000/api/login`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const { result, error, success } = await response.json();

      if (!success) {
        toast.error(error?.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      localStorage.setItem("email", result?.email);
      if(next){
       navigate(`/${next}`);
      }else{
       navigate('/')
      }
       
    }
  };

  return (
    <>
      <Box sx={boxstyle}>
        {/* Outer Card box */}
        <Grid container>
          <Grid item xs={12} sm={12} lg={6}>
            <Box
              style={{
                backgroundImage: `url(${login_bg})`,
                backgroundSize: "300px 250px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                margin: "30px",
                height: "63vh",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={6}>
            <Box
              style={{
                backgroundSize: "cover",
                height: "70vh",
                minHeight: "500px",
              }}
            >
              <Container>
                <Box height={35} />
                <Box sx={center}>
                  <Typography component="h1" variant="h4" fontFamily={"Lato"}>
                    Sign In
                  </Typography>
                </Box>
                <form onSubmit={handleSubmit} autoComplete="off">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        label="Email address"
                        name="email"
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography
                          variant="body1"
                          component="span"
                          onClick={() => {}}
                          style={{
                            cursor: "pointer",
                            color: "#0078d7",
                            fontFamily: "Lato",
                          }}
                        >
                          Forgot password?
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        type="submit"
                        sx={{
                          borderRadius: 28,
                          color: "#ffffff",
                          backgroundColor: "#3B3B3D",
                          fontFamily: "Lato",
                        }}
                      >
                        Sign in
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        spacing={2}
                      >
                        <Typography
                          variant="body1"
                          component="span"
                          style={{ marginTop: "10px" }}
                          fontFamily={"Lato"}
                        >
                          Need an account?{" "}
                          <span
                            style={{
                              color: "#0078d7",
                              cursor: "pointer",
                              fontFamily: "Lato",
                            }}
                          >
                            <Link
                              to="/register"
                              style={{ textDecoration: "none" }}
                            >
                              Sign up
                            </Link>
                          </span>
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </form>
              </Container>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </>
  );
}

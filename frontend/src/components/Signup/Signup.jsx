import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import signup_bg from "../../illustrations/signup_bg.svg";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "max-content",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const center = {
  position: "relative",
  top: "50%",
  left: "17%",
};

export default function Signup() {
  // const [setOpen] = useState(false);
   
  const [setOpen] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    // setOpen(true);
    console.log(event)
    event.preventDefault();

    if (password !== confirmPassword) {
      console.log("not matched");
      toast.error("Password and Confirm Password are not same", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    } else {
      const apiUrl = `http://127.0.0.1:8000/api/register`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ first_name, last_name, email, password }),
      });
      const { result, error, success } = await response.json();
      if (!success) {
        toast.error(error?.email?.[0], {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }

      localStorage.setItem("email", result?.email);
      navigate("/");
    }
  };

  return (
    <>
      <Box sx={boxstyle}>
        {/* Outer Card box */}
        <Grid container>
          <Grid item xs={12} sm={12} lg={6} gap={2}>
            <Box
              style={{
                backgroundImage: `url(${signup_bg})`,
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
                  <Typography
                    component="h1"
                    variant="h4"
                    fontFamily={"Lato"}
                    marginBottom={"3px"}
                  >
                    Create an account
                  </Typography>
                </Box>
                <form onSubmit={handleSubmit} autoComplete="off">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography display="flex" gap={1}>
                        <TextField
                          required
                          width="50%"
                          value={first_name}
                          onChange={(e) => setFirstName(e.target.value)}
                          id="first_name"
                          label="First Name"
                          name="firstName"
                          type="text"
                        />
                        <TextField
                          required
                          value={last_name}
                          onChange={(e) => setLastName(e.target.value)}
                          width="50%"
                          id="last_name"
                          label="Last Name"
                          name="lastName"
                          type="text"
                        />
                      </Typography>
                    </Grid>

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
                      <TextField
                        required
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        name="password"
                        label="Confirm Password"
                        type="password"
                        id="confirm_password"
                      />
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
                          marginTop: "5px",
                        }}
                      >
                        Create Account
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
                          style={{ marginTop: "2px" }}
                          fontFamily={"Lato"}
                        >
                          Already have an account?{" "}
                          <span
                            style={{
                              color: "#0078d7",
                              cursor: "pointer",
                              fontFamily: "Lato",
                            }}
                          >
                            <Link
                              to="/login"
                              style={{ textDecoration: "none" }}
                            >
                              Sign in
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

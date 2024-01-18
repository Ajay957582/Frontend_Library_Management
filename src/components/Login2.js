import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { Link } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  TextField,
  // FormControl,
  // FormLabel,
  Button,
  Container,
  // Grid,
  Box,
  CssBaseline,
  Avatar,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Link as Muilink } from "@mui/material";

function Login2({
  setTokenInBrowser,
  setSnakeBar,
  setSnackMsg,
  setSeverity,
  isLoading,
  setIsLoading,
}) {
  const [lemail, setLemail] = useState("");
  const [lpassword, setLpassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const navigate = useNavigate();

  function loginSubmitHandler() {
    // e.preventDefault();
    try {
      if (lemail === "" || lpassword === "") {
        setSeverity("warning");
        setSnackMsg("Feilds cant be empty");
        setSnakeBar(true);

        return;
      }
      setIsLoading(true);
      fetch("https://backed-for-library-management.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lemail, lpassword }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.token) {
            setIsLoading(false);
            setSnackMsg("Logged In .");
            setSeverity("success");
            setSnakeBar(true);
            localStorage.setItem("token", data.token);
            setTokenInBrowser(true);
            navigate("/");
          }
          if (data.message === "wrong password") {
            // console.log(data);
            setIsLoading(false);
            setSnackMsg("wrong password !");
            setSeverity("error");
            setSnakeBar(true);
          }
          if (data.message === "user not exists") {
            setIsLoading(false);
            setSnackMsg("User not exists , Register First");
            setSeverity("warning");
            setSnakeBar(true);
            navigate("/register");
          }
        });
    } catch (error) {
      console.log(error, "from login form submission at frontend");
    }
  }
  return (
    <>
      <Container
        maxWidth="xs"
        component="main"
        // sx={{ border: "1px solid black" }}
      >
        <CssBaseline />
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // border: "1px solid black",
          }}
        >
          <Avatar sx={{ bgcolor: "primary.main", m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" component="h1">
            Sign In
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            noValidate
            fullWidth
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth={true}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              autoFocus
              value={lemail}
              onChange={(e) => setLemail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth={true}
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              type="password"
              value={lpassword}
              onChange={(e) => setLpassword(e.target.value)}
            />
            {/* <FormControlLabel
                control={<Checkbox value={checkbox} />}
                label="Remember me"
                labelPlacement="right"
              /> */}
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              onClick={loginSubmitHandler}
            >
              Sign in
            </Button>
            <Muilink component={Link} variant="body2" to="/register">
              {"Don't have an account? Sign Up"}
            </Muilink>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login2;

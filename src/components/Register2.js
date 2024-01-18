import React, { useState, useRef } from "react";

import {
  Container,
  Box,
  Avatar,
  Tooltip,
  IconButton,
  Grid,
  TextField,
  Typography,
  Button,
  Link as Muilink,
  CircularProgress,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
function Register2({ setSnakeBar, setSnackMsg, setSeverity, setIsLoading }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [chooseImagePath, setChooseImagePath] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const inputEl = useRef(null);
  const url = "https://api.cloudinary.com/v1_1/drvpyybiy/image/upload";

  function registerImageHandler(event) {
    // console.log(event.target.files[0]);
    // setChooseImagePath(e.target.value);
    const reader = new FileReader();
    // console.log(reader);
    reader.onload = function (e) {
      setChooseImagePath(e.target.result);
      // console.log(e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  function userNameHandler(e) {
    setUserName(e.target.value);
  }
  function enrollmentNumberHandler(e) {
    setEnrollmentNumber(e.target.value);
  }
  function emailHandler(e) {
    setEmail(e.target.value);
  }
  function passwordHandler(e) {
    setPassword(e.target.value);
  }
  async function registerSubmit(e) {
    e.preventDefault();

    try {
      if (chooseImagePath === "") {
        setSnackMsg("Profile Picture is required");
        setSeverity("warning");
        setSnakeBar(true);
        return;
      }
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", chooseImagePath);
      formData.append(
        "upload_preset",
        "library_management_profile_pic_unsigned_preset"
      );

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      // console.log(response);
      const data = await response.json();
      console.log(data.url);

      fetch("https://backed-for-library-management.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName,
          email,
          password,
          enrollmentNumber,
          profile_pic: data.url,
          books: [],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message === "user is registered successfully") {
            setIsLoading(false);
            setSeverity("success");
            setSnackMsg("User Registered");
            setSnakeBar(true);
            navigate("/login");
          }

          if (data.message === "Enrollment Number already exists") {
            setIsLoading(false);
            setSeverity("warning");
            setSnackMsg("Enrollment Number already exists");
            setSnakeBar(true);
          }
        });
    } catch (error) {
      console.log(error, "from register form post request");
    }
  }

  //////////////////////

  function avatarClicked() {
    inputEl.current.click();
  }
  return (
    <>
      <Container maxWidth="xs" component="main">
        <form onSubmit={registerSubmit}>
          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // border: "1px solid black",
            }}
          >
            <input
              type="file"
              accept="image"
              ref={inputEl}
              onChange={registerImageHandler}
              hidden
            />
            <Tooltip title="Select Image">
              <IconButton onClick={avatarClicked}>
                <Avatar
                  sx={{ height: 100, width: 100, m: 1 }}
                  src={chooseImagePath}
                />
              </IconButton>
            </Tooltip>
            <Typography variant="h5" component="h1">
              Sign up
            </Typography>

            <Grid container rowSpacing={0} columnSpacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="User name"
                  name="username"
                  autoComplete="username"
                  type="text"
                  autoFocus
                  value={userName}
                  onChange={userNameHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="enrollment"
                  label="Enrollment number"
                  name="enrollment-number"
                  autoComplete="enrollment"
                  type="text"
                  autoFocus
                  value={enrollmentNumber}
                  onChange={enrollmentNumberHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  autoFocus
                  value={email}
                  onChange={emailHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="password"
                  type="password"
                  autoFocus
                  value={password}
                  onChange={passwordHandler}
                />
              </Grid>
            </Grid>
            <Button
              type="Submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Sign up
            </Button>
            <Muilink component={Link} variant="body2" to="/login">
              {"Already a user !! Log in "}
            </Muilink>
          </Box>
        </form>
      </Container>
    </>
  );
}

export default Register2;

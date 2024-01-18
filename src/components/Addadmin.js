import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  IconButton,
  ListItemText,
  Divider,
  Button,
  Grid,
  TextField,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function Addadmin({ setIsLoading, setSnackMsg, setSnakeBar, setSeverity }) {
  const [adminArray, setAdminArray] = useState([]);
  const [emaiToAdd, setEmailToAdd] = useState("");
  useEffect(() => {
    try {
      // eslint-disable-next-line
      setIsLoading(true);
      fetch("https://backed-for-library-management.onrender.com/adminlist")
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          // console.log(data);
          setAdminArray(data);
        });
    } catch (error) {
      console.log(error, "error while fetching admins list");
    }
  }, []);

  function handelDeleteAdmin(i) {
    try {
      setIsLoading(true);
      fetch("http://localhost:2000/deleteadmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminArray[i] }),
      })
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          setSeverity("success");
          setSnackMsg("Deleted Successfully");
          setSnakeBar(true);
          // console.log(data);
          setAdminArray(data);
        });
    } catch (error) {
      console.log(error, "error while fetching admins list");
    }
  }

  function addAdminHandler(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      fetch("https://backed-for-library-management.onrender.com/addadmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emaiToAdd }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setIsLoading(false);
          if (data.message === "Admin Already Exists") {
            // alert(data.message);
            setSeverity("warning");
            setSnackMsg("Already a Admin");
            setSnakeBar(true);
            return;
          }
          if (data.message === "This Email is not a user") {
            // alert(data.message);
            setSeverity("warning");
            setSnackMsg("This is not a user");
            setSnakeBar(true);
            return;
          }
          setSeverity("success");
          setSnackMsg("Admin added");
          setSnakeBar(true);
          setAdminArray(data);
        });
    } catch (error) {
      console.log(error, "error while fetching admins list");
    }
  }
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="h4">
          ADMIN{" "}
        </Typography>
        <Box sx={{}} maxWidth={500} width="100%" mt={1}>
          <List sx={{ bgcolor: "primary.last", borderRadius: 2 }}>
            {adminArray.map((value, i) => (
              <>
                {" "}
                <ListItem
                  key={value}
                  //disableGutters
                  secondaryAction={
                    <IconButton
                      aria-label="comment"
                      onClick={() => handelDeleteAdmin(i)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={`${i + 1}. ${value}`} />
                </ListItem>{" "}
                <Divider sx={{ color: "black" }} width="100%" />
              </>
            ))}
          </List>
        </Box>
        <Box mt={5}>
          <form onSubmit={addAdminHandler}>
            <FormControl>
              <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="email"
                    required
                    variant="standard"
                    value={emaiToAdd}
                    onChange={(e) => setEmailToAdd(e.target.value)}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <Button type="submit">
                    <AddIcon /> {"  "}Admin
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default Addadmin;

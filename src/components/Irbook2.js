import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import CardIR from "./CardIR";

function Irbook2({ setIsLoading, setSnackMsg, setSnakeBar, setSeverity }) {
  const [allBooks, setAllBooks] = useState([]);
  const [enrollment, setEnrollment] = useState("");
  const [searchedEnrollment, setSearchedEnrollment] = useState("");
  const [bookId, setBookId] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  function searchEnrollHandler() {
    try {
      setIsLoading(true);
      fetch("https://backed-for-library-management.onrender.com/irbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollment }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.message === "Didnt found any user of this enrollment ID!!") {
            setIsLoading(false);
            setSeverity("warning");
            setSnackMsg("Invalid Enrollment ID");
            setSnakeBar(true);
          } else {
            setIsLoading(false);
            setSeverity("success");
            setSnackMsg("Enrollment Id Matched");
            setSnakeBar(true);
            setAllBooks(data);
            setSearchedEnrollment(enrollment);
            setIsVisible(true);

            // console.log(data);
          }
        });
    } catch (error) {
      console.log(
        error,
        "error from ir book comoponent,while feching books array of user"
      );
    }
  }

  function bookAddHandler() {
    try {
      setIsLoading(true);
      fetch("https://backed-for-library-management.onrender.com/issuebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchedEnrollment, bookId }),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          console.log(data, "haa bhai yehi haiiiiiiii🔥🔥🔥");
          if (
            data.message ===
            "To add a new book you need to , search a user first !!"
          ) {
            setSeverity("warning");
            setSnackMsg("Search a user first ");
            setSnakeBar(true);
            // alert(data.message);
          }

          if (data.message === "book already exists") {
            setSeverity("warning");
            setSnackMsg("Book already exists !! ");
            setSnakeBar(true);
            // alert(data.message);
          }
          if (data.message === "Can't find any book by this book Id") {
            setSeverity("error");
            setSnackMsg("Invalid Book ID  ");
            setSnakeBar(true);
            // alert(data.message);
          }
          if (data.message === "book Updates Successfully!!") {
            // console.log(data.booksList);
            setSeverity("success");
            setSnackMsg("Book Updated Successfully  ");
            setSnakeBar(true);
            setAllBooks(data.booksList);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Container>
        <Box
          //   marginTop={5}
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            // border: "1px solid black",
          }}
        >
          <Typography variant="h5" component="h1">
            Issue / Return
          </Typography>
          <TextField
            sx={{ width: "300px" }}
            variant="standard"
            label="Enrollment no."
            margin="normal"
            required
            fullWidth={true}
            autoComplete="enroll"
            type="text"
            autoFocus
            value={enrollment}
            onChange={(e) => setEnrollment(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={searchEnrollHandler}
            sx={{ marginBottom: 3 }}
          >
            Find
          </Button>
          <Grid container rowSpacing={5}>
            {allBooks.map((elem, i) => (
              <Grid item lg={4} xs={12} md={6}>
                <CardIR
                  bookId={elem.bookId}
                  issueDate={elem.issueDate}
                  key={i}
                  index={i}
                  enrollment={searchedEnrollment}
                  setAllBooks={setAllBooks}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      {isVisible ? (
        <>
          <Divider sx={{ marginTop: 5 }} />
          <Container maxWidth="sm">
            <Box
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                // border: "1px solid black",
              }}
            >
              <Typography variant="h5" component="h1">
                Add Book
              </Typography>
              <TextField
                sx={{ width: "300px" }}
                variant="filled"
                label="Book ID"
                margin="normal"
                required
                fullWidth={true}
                // autoComplete="book Id"
                type="text"
                autoFocus
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={bookAddHandler}
                sx={{ marginBottom: 3 }}
              >
                Add
              </Button>
            </Box>
          </Container>
        </>
      ) : null}
    </>
  );
}

export default Irbook2;

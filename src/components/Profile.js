import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Tooltip,
  Avatar,
  Grid,
  Divider,
  Alert,
} from "@mui/material";
import { differenceInDays } from "date-fns";

function Bookname({ elem, setExtraDays }) {
  const [bookName, setBookName] = useState("");
  useEffect(() => {
    try {
      fetch("https://backed-for-library-management.onrender.com/bookname", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: elem.bookId }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setBookName(data.bookName);
        });
      const returnDate = new Date(elem.issueDate);
      returnDate.setDate(returnDate.getDate() + 30);

      const difference = differenceInDays(new Date(), returnDate);

      if (difference <= 0) {
        setExtraDays((e) => e + 0);
      } else {
        setExtraDays((e) => e + difference);
      }
    } catch (error) {
      console.log(error, "this error from Bookname componenet");
    }
  }, []);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="body1" color="red">
          {bookName}
        </Typography>
      </Grid>
    </>
  );
}

function Profile({ src }) {
  const [extraDays, setExtraDays] = useState(0);
  const [arrayOfBooks, setArrayOfBooks] = useState([]);
  const [name, setName] = useState("");
  const [enrollment, setEnrollment] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      fetch("https://backed-for-library-management.onrender.com/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setName(data.name);
          setEnrollment(data.enrollment_number);
        });
    } catch (error) {
      console.error(error, "from profile pic fetching");
    }
  }, []);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      fetch("https://backed-for-library-management.onrender.com/mybooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setArrayOfBooks(data.arr);
        });
    } catch (error) {
      console.log(error, "error from proile , while fetching for book names ");
    }
  }, []);
  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // border: "1px solid black",
          }}
        >
          {/* <Typography variant="h4" component="h1" color="primary.main">
            PROFILE
          </Typography> */}
          <Tooltip title="Your Avatar">
            <Avatar sx={{ height: 150, width: 150 }} src={src} />
          </Tooltip>
          <Typography variant="h4" component="h3" color="black" mt={1}>
            {name}
          </Typography>
          <Typography variant="h6" component="h6" color="gray">
            {enrollment}
          </Typography>
          <Grid container marginTop={5}>
            <Grid item xs={3}>
              <Typography
                variant="h6"
                // component="h6"
                sx={{ fontWeight: 6 }}
                color="black"
              >
                Books :
              </Typography>
            </Grid>
            <Grid item container spacing={2} xs={9}>
              {arrayOfBooks.length === 0 ? (
                <Grid item xs={12}>
                  <Alert severity="warning" variant="filled">
                    You have no Books Issued , Ask Admin/Librarian to issue one
                    .
                  </Alert>
                </Grid>
              ) : (
                arrayOfBooks.map((elem, i) => (
                  <Bookname key={i} elem={elem} setExtraDays={setExtraDays} />
                ))
              )}
            </Grid>
          </Grid>
          <Box sx={{ width: "100%" }}>
            {" "}
            <Divider variant="Middle" sx={{ margin: "20px" }} />
          </Box>
          <Grid container>
            <Grid item xs={5}>
              <Typography
                variant="h6"
                // component="h6"
                sx={{ fontWeight: 6 }}
                color="black"
              >
                {" "}
                Total fine :
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography color="green" variant="body1">
                {(extraDays * 5) / 2}
                {" Rs"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Profile;

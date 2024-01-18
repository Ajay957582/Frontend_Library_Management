import { Box, Container, Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Normalcard from "./Normalcard";
import { Alert } from "@mui/material";

function Mybooks({ setIsLoading }) {
  const [name, setName] = useState("");
  const [booksArray, setBooksArray] = useState([]);
  useEffect(() => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      fetch("https://backed-for-library-management.onrender.com/mybooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          setName(data.name);
          setBooksArray(data.arr);
        });
    } catch (error) {
      console.log(error, "error from my books");
    }
  }, []);
  return (
    <>
      <Container maxWidth="lg">
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
          <Typography variant="h5" component="h4">
            My books
          </Typography>
          <Grid container spacing={4}>
            {booksArray.length === 0 ? (
              <Grid item xs={12}>
                <Alert severity="info" variant="filled">
                  You have no Books Issued , Ask Admin/Librarian to issue one .
                </Alert>
              </Grid>
            ) : (
              <>
                <Grid item xs={12}>
                  <Typography>Name : {name}</Typography>
                </Grid>
                {booksArray.map((elem, i) => (
                  <Grid item xs={12} sm={6} md={4}>
                    <Normalcard
                      bookId={elem.bookId}
                      issueDate={elem.issueDate}
                      key={i}
                    />
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Mybooks;

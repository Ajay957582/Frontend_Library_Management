import {
  Container,
  Grid,
  Box,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
  TextField,
  Autocomplete,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import SearchCard from "./SearchCard";

function Search({ setSnakeBar, setSnackMsg, setSeverity }) {
  const [arrayForSearch, setArrayForSearch] = useState([]);
  const [searchBy, setSearchBy] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toSearch, setToSearch] = useState("");
  const [image, setImage] = useState("");
  const [bookId, setbookId] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPDF, setBookPDF] = useState("");
  const [showCard, setShowCard] = useState(false);

  function handleChange(e) {
    setSearchBy(e.target.value);
    setToSearch("");
  }
  function searchButtonClickHandler() {
    if (searchBy === "") {
      setSeverity("warning");
      setSnackMsg("Choose one searching Option");
      setSnakeBar(true);
      return;
    }

    if (toSearch === "") {
      setSeverity("warning");
      setSnackMsg("Search feild can't be empty");
      setSnakeBar(true);
      return;
    }
    if (arrayForSearch.includes(toSearch)) {
      try {
        fetch(
          `https://backed-for-library-management.onrender.com/searchby${searchBy}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ searchBy: toSearch }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            setShowCard(true);
            setImage(data.bookImage);
            setBookName(data.bookName);
            setBookAuthor(data.bookAuthor);
            setbookId(data.bookId);
            setBookPDF(data.bookPDF);
          });
      } catch (error) {
        console.log(error, "error while searching the Book");
      }
    } else {
      setSeverity("warning");
      setSnackMsg("Search from the given Options ");
      setSnakeBar(true);
    }
  }

  function serchFeildChangeHandler(e, nv) {
    setSeverity("info");
    setSnackMsg(`NOTE : ${searchBy} should be accurate`);
    setSnakeBar(true);
    setToSearch(nv);
  }
  useEffect(() => {
    if (searchBy === "") {
      return;
    }
    try {
      setIsLoading(true);
      fetch(`https://backed-for-library-management.onrender.com/${searchBy}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setIsLoading(false);
          setArrayForSearch(data);
        });
    } catch (error) {
      console.log(error, "error while fetching array for search");
    }
  }, [searchBy]);
  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            mt: 7,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="label">Search by</InputLabel>

            <Select
              labelId="label"
              value={searchBy}
              label="Search by"
              onChange={handleChange}
            >
              <MenuItem value={"title"}>Book Title</MenuItem>
              <MenuItem value={"id"}>Book ID</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {isLoading ? (
          <Box fullWidth mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <Box fullWidth mt={5}>
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
                <Autocomplete
                  value={toSearch}
                  onChange={serchFeildChangeHandler}
                  // inputValue={toSearch}
                  // onInputChange={serchFeildChangeHandler}
                  // disablePortal
                  // id="combo-box-demo"
                  options={arrayForSearch}
                  // sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={`Search by Book ${searchBy}`}
                    />
                  )}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  onClick={searchButtonClickHandler}
                  sx={{ marginBottom: 5 }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
        <Divider />
        {showCard ? (
          <Box
            sx={{
              padding: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SearchCard
              image={image}
              bookId={bookId}
              bookName={bookName}
              bookAuthor={bookAuthor}
              bookPDF={bookPDF}
            />
          </Box>
        ) : null}
      </Container>
    </>
  );
}

export default Search;

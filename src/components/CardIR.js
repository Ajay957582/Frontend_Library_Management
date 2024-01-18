import React, { useState, useEffect } from "react";
import { Container, Box, Avatar } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid, Tooltip, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import moment from "moment";
import { differenceInDays } from "date-fns";

function CardIR({ bookId, issueDate, index, enrollment, setAllBooks }) {
  const [image, setImage] = useState("");
  const [bookName, setBookName] = useState("");

  const [author, setAuthor] = useState("");
  const [extra, setExtra] = useState(0);

  const updatedDate = moment(issueDate).format("DD MMMM YYYY");
  const date = new Date(issueDate);
  date.setDate(date.getDate() + 30);

  const sDate = new Date(date);
  const daysDifference = differenceInDays(new Date(), sDate);
  useEffect(() => {
    if (daysDifference <= 0) {
      setExtra(0);
    } else {
      setExtra(daysDifference);
    }
  }, []);

  useEffect(() => {
    try {
      fetch("https://backed-for-library-management.onrender.com/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message === "success") {
            console.log(data.book);
            setImage(data.book.bookImage);
            setBookName(data.book.bookName);
            setAuthor(data.book.bookAuthor);
          }
        });
    } catch (error) {
      console.log(error, "error from card");
    }
  }, []);

  function deleteBookHandler() {
    try {
      fetch("https://backed-for-library-management.onrender.com/deletebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollment, bookId }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message === "success") {
            setAllBooks(data.updatedUser);
            console.log(data.updatedUser, "an array after deleting book");
          }
        });
    } catch (error) {
      console.log(error, "error from delete button handler");
    }
  }
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={image}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ margin: "0px" }}
          >
            {bookName}
          </Typography>
          <Typography
            variant="h6"
            color="gray"
            component="h6"
            sx={{ margin: "0px", marginBottom: 1.5 }}
          >
            {author}
          </Typography>
          <Grid container rowSpacing={1} columnSpacing={0}>
            <Grid item xs={4}>
              <Typography> Issue : </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography> {updatedDate} </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography> Return : </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>
                {" "}
                {date.getDate()}{" "}
                {date.toLocaleString("en-US", {
                  month: "long",
                })}{" "}
                {date.getFullYear()}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography> Extra days : </Typography>
            </Grid>
            <Grid item xs={8} color="red">
              <Typography>
                {extra}
                {" days"}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography> Fine : </Typography>
            </Grid>
            <Grid item xs={8} color="green">
              <Typography>
                {extra * 5}
                {" Rs"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container spacing={2}>
            <Grid
              item
              xs={10}
              sx={{
                display: "flex",
                alignItems: "end",
              }}
            >
              <Tooltip title="Book ID" sx={{ margin: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {bookId}
                </Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={2}>
              <Tooltip title="Delete Book">
                <IconButton onClick={deleteBookHandler}>
                  <Avatar sx={{ bgcolor: "red" }}>
                    <DeleteForeverIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
}

export default CardIR;

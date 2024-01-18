import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Grid, Tooltip, IconButton, Avatar, Link } from "@mui/material";
function SearchCard({ image, bookId, bookName, bookAuthor, bookPDF }) {
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
            {bookAuthor}
          </Typography>
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
                <IconButton component={Link} href={bookPDF} target="_blank">
                  <Avatar sx={{ bgcolor: "red" }}>
                    <PictureAsPdfIcon />
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

export default SearchCard;

import React from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import InsightsIcon from "@mui/icons-material/Insights";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SearchIcon from "@mui/icons-material/Search";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Link,
} from "@mui/material";

function Home() {
  return (
    <>
      <Box fullwidth sx={{}} height="100vh" p={5}>
        <Grid container sx={{ mt: 5 }} rowSpacing={5} columnSpacing={5}>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card sx={{ width: 300, height: 170 }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ color: "primary.main", height: "auto" }}>
                  <PersonAddIcon sx={{ fontSize: 100 }} />
                </Box>

                <Typography
                  // sx={{ fontSize: 14 }}
                  color="gray"
                  gutterBottom
                  variant="h5"
                  component="h3"
                >
                  Register
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card sx={{ width: 300, height: 170 }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ color: "primary.main", height: "auto" }}>
                  <CollectionsBookmarkIcon sx={{ fontSize: 100 }} />
                </Box>

                <Typography
                  // sx={{ fontSize: 14 }}
                  color="gray"
                  gutterBottom
                  variant="h5"
                  component="h3"
                >
                  Issue Book
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card sx={{ width: 300, height: 170 }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ color: "primary.main", height: "auto" }}>
                  <InsightsIcon sx={{ fontSize: 100 }} />
                </Box>

                <Typography
                  // sx={{ fontSize: 14 }}
                  color="gray"
                  gutterBottom
                  variant="h5"
                  component="h3"
                >
                  Track Books
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card sx={{ width: 300, height: 170 }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ color: "primary.main", height: "auto" }}>
                  <CurrencyRupeeIcon sx={{ fontSize: 100 }} />
                </Box>

                <Typography
                  // sx={{ fontSize: 14 }}
                  color="gray"
                  gutterBottom
                  variant="h5"
                  component="h3"
                >
                  Track Fine
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card sx={{ width: 300, height: 170 }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ color: "primary.main", height: "auto" }}>
                  <SearchIcon sx={{ fontSize: 100 }} />
                </Box>

                <Typography
                  // sx={{ fontSize: 14 }}
                  color="gray"
                  gutterBottom
                  variant="h5"
                  component="h3"
                >
                  Search Books
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card sx={{ width: 300, height: 170 }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ color: "primary.main", height: "auto" }}>
                  <AdminPanelSettingsIcon sx={{ fontSize: 100 }} />
                </Box>

                <Typography
                  // sx={{ fontSize: 14 }}
                  color="gray"
                  gutterBottom
                  variant="h5"
                  component="h3"
                >
                  Admin Dashbord
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box>
          <Grid container mt={5} bgcolor="gray" minHeight={300}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5">Contact Us</Typography>
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  maxWidth: 300,
                  width: "100%",
                }}
              >
                <IconButton
                  sx={{ color: "blue" }}
                  component={Link}
                  href="mailto:ajaymore123.indore@gmail.com"
                >
                  <EmailIcon />
                </IconButton>
                <IconButton
                  sx={{ color: "blue" }}
                  component={Link}
                  href="https://www.instagram.com/ajaymore16.indore/"
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  sx={{ color: "blue" }}
                  component={Link}
                  href="https://www.linkedin.com/in/ajay-more-603614236/"
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  sx={{ color: "blue" }}
                  href="https://twitter.com/AjayMor56266528"
                  component={Link}
                >
                  <XIcon />
                </IconButton>
              </Box>
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
              <Typography variant="subtitle2">
                Copyright © 2024 library.com
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Home;

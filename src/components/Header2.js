import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import BookIcon from "@mui/icons-material/Book";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
// import AdminOptions from "./AdminOptions";
import { Link, useNavigate } from "react-router-dom";
import AdminOptions2 from "./AdminOptions2.js";
import ProfileLogo from "./ProfileLogo.js";
function Header2({
  tokenInBrowser,
  isAdmin,
  setTokenInBrowser,
  src,
  setSrc,
  setSnakeBar,
  setSnackMsg,
  setSeverity,
}) {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const navigate = useNavigate();
  const arrayOne = [<HowToRegIcon />, <LoginIcon />];
  const arrayTwo = [
    <Link to="/register">Register</Link>,
    <Link to="/login">Log In</Link>,
  ];
  const arrayForRealNav = [
    <Link to="/home">Home</Link>,
    <Link to="/search">Search</Link>,
    <Link to="/mybooks">My Books</Link>,
    <Link to="/profile">Profile</Link>,
  ];

  const arrayForRealNavLogo = [
    <HomeIcon />,
    <SearchIcon />,
    <BookIcon />,
    <AccountBoxIcon />,
  ];

  // const arrayForAdmin = [];

  const realNav = arrayForRealNav.map((word, index) => {
    return (
      <ListItem key={index}>
        <ListItemButton
          onClick={(e) => {
            setIsBurgerOpen(false);
          }}
        >
          <ListItemIcon>{arrayForRealNavLogo[index]}</ListItemIcon>
          <ListItemText>{word}</ListItemText>
        </ListItemButton>
      </ListItem>
    );
  });

  const regLogActualButtons = arrayTwo.map((worda, index) => (
    <ListItem key={worda}>
      <ListItemButton onClick={(e) => setIsBurgerOpen(false)}>
        <ListItemIcon>{arrayOne[index]}</ListItemIcon>
        <ListItemText>{worda}</ListItemText>
      </ListItemButton>
    </ListItem>
  ));

  const forLogOut = (
    <ListItem>
      <ListItemButton
        onClick={(e) => {
          setSeverity("success");
          setSnackMsg("Logged Out");
          setSnakeBar(true);
          localStorage.removeItem("token");
          setTokenInBrowser(false);
          navigate("/");
          setIsBurgerOpen(false);
        }}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText>Log Out</ListItemText>
      </ListItemButton>
    </ListItem>
  );

  const regLog = (
    <Drawer anchor="left" open={true} varient="temporary">
      <List sx={{ width: "300px" }}>
        <ListItem>
          <ListItemButton onClick={(e) => setIsBurgerOpen(false)}>
            <ListItemIcon>
              <ClearOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Close</ListItemText>
          </ListItemButton>
        </ListItem>

        <Divider />
        {tokenInBrowser ? realNav : regLogActualButtons}
        {tokenInBrowser ? (
          isAdmin ? (
            <>
              <Divider />
              <AdminOptions2 setIsBurgerOpen={setIsBurgerOpen} />
            </>
          ) : null
        ) : null}
        <Divider sx={{ marginTop: 1.5 }} />
        {tokenInBrowser ? forLogOut : null}
      </List>
    </Drawer>
  );

  return (
    <>
      <Box>
        <AppBar sx={{ bgcolor: "primary.right" }} position="static">
          <Toolbar>
            <IconButton onClick={(e) => setIsBurgerOpen(true)}>
              <MenuOutlinedIcon sx={{ fontSize: "30px", color: "white" }} />
            </IconButton>
            <Typography varient="h6">
              <Link to="/home">LIBRARY</Link>
            </Typography>
            {tokenInBrowser ? (
              <ProfileLogo src={src} setSrc={setSrc} />
            ) : (
              <Stack spacing={2} direction="row" sx={{ marginLeft: "auto" }}>
                <Button variant="outline">
                  <Link to="/login">LOG IN</Link>
                </Button>
                <Button variant="contained">
                  <Link to="/register">SIGN UP</Link>
                </Button>
              </Stack>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {/* 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888 */}
      {isBurgerOpen ? regLog : null}
    </>
  );
}

export default Header2;

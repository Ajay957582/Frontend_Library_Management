import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { Box, Tooltip, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProfileLogo({ src, setSrc }) {
  const navigate = useNavigate();
  try {
    useEffect(function () {
      const x = localStorage.getItem("token");

      fetch("https://backed-for-library-management.onrender.com/profilepic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ x }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "success") {
            setSrc(data.profile_pic);
          }
        });
    }, []);
  } catch (error) {
    console.log(error);
  }
  function profileLogoClickHandler() {
    navigate("profile");
  }
  return (
    <>
      <Box sx={{ marginLeft: "auto" }}>
        <Tooltip title="Open profile">
          <IconButton onClick={profileLogoClickHandler} sx={{ p: 0 }}>
            <Avatar alt="profile Pic" src={src} />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
}

export default ProfileLogo;

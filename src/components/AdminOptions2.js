import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select, MenuItem, InputLabel, FormControl, Box } from "@mui/material";

function AdminOptions2({ setIsBurgerOpen }) {
  const [adminOption, setAdminOption] = useState("");
  const navigate = useNavigate();
  function handleChange(e) {
    setAdminOption(e.target.value);
    navigate(`admin/${e.target.value}`);
    setIsBurgerOpen(false);
  }
  return (
    <>
      <Box sx={{ paddingLeft: "20%", marginTop: "5%" }}>
        <FormControl sx={{ minWidth: "70%" }}>
          <InputLabel id="forSelect">Admin Options</InputLabel>
          <Select
            labelId="forSelect"
            id="demo-simple-select"
            value={adminOption}
            label="Admin Options"
            onChange={handleChange}
          >
            <MenuItem value="addbook">New Book</MenuItem>
            <MenuItem value="irbook">Issue/Return Book</MenuItem>
            <MenuItem value="addadmin">Add Admin</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

export default AdminOptions2;

import React from "react";
import { useNavigate } from "react-router-dom";
function AdminOptions() {
  const navigate = useNavigate();
  function adminOptionHandler(e) {
    navigate(`admin/${e.target.value}`);
  }
  return (
    <>
      <label htmlFor="admin">Admin: </label>

      <select id="admin" onChange={adminOptionHandler}>
        <option value="addbook">New book</option>
        <option value="irbook">Issue/Return Book</option>
        <option value="addadmin">Add admin</option>
      </select>
    </>
  );
}

export default AdminOptions;

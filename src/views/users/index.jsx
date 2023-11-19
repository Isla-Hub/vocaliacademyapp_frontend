import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersData } from "../../features/users/usersSlice";

function Users() {
  const usersData = useSelector((state) => state.users.data);
  console.log(usersData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersData());
  });
  return (
    <Box m="20px">
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Header title="Usuarios" subtitle="Usuarios de la academia" />
      </Box>
    </Box>
  );
}

export default Users;

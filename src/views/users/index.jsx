import React from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";

function Users() {
  return (
    <Box m="20px">
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Header title="Usuarios" subtitle="Usuarios de la academia" />
      </Box>
    </Box>
  );
}

export default Users;

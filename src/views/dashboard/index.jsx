import { Box } from "@mui/material";
import Header from "../../components/Header";
import React from "react";

const Dashboard = () => {
  return (
    <Box m="20px">
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Header title="Dashboard" subtitle="Bienvenido a tu Dashboard" />
      </Box>
    </Box>
  );
};

export default Dashboard;

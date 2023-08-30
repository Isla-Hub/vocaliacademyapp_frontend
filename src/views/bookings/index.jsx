import React from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";

const Bookings = () => {
  return (
    <Box m="20px">
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Header title="Reservas" subtitle="Reservas de clases y salas" />
      </Box>
    </Box>
  );
};

export default Bookings;

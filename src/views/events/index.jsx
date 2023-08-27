import React from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";

const Events = () => {
  return (
    <Box m="20px">
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Header title="Eventos" subtitle="Eventos de la academia" />
      </Box>
    </Box>
  );
};

export default Events;

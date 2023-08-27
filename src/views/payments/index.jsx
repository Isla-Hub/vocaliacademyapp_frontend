import React from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";

const Payments = () => {
  return (
    <Box m="20px">
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Header title="Pagos" subtitle="Pagos de alumnos" />
      </Box>
    </Box>
  );
};

export default Payments;

import React from "react";
import { Box } from "@mui/material";
import { ChildrenProvider } from "@/types";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Layout: React.FC<ChildrenProvider> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#141414",
        color: "#fff",
      }}
    >
      <Navbar />
      <Box
        sx={{
          flex: 1,
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;

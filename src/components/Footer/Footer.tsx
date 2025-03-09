import {
  Facebook,
  Instagram,
  Twitter,
  YouTube
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

const Footer: React.FC = () => {
  return (
    <Box
      style={{
        backgroundColor: "#141414",
        color: "rgba(255, 255, 255, 0.5)",
        padding: "0 5rem 3rem 5rem",
      }}
    >
      <Box
        sx={{
          display: { sm: "flex" },
          color: "white",
          flexDirection: { md: "row" },
          gap: "3rem",
          marginBottom: "1rem",
        }}
      >
        <Facebook style={{ fontSize: "2rem" }} />
        <Instagram style={{ fontSize: "2rem" }} />
        <Twitter style={{ fontSize: "2rem" }} />
        <YouTube style={{ fontSize: "2rem" }} />
      </Box>
      <Box
        sx={{
          display: { sm: "flex" },
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography>Audio Descriptions</Typography>
          <Typography>Investor Relationship</Typography>
          <Typography>Policy</Typography>
          <Typography>Contact Us</Typography>
        </Box>
        <Box>
          <Typography>Help Center</Typography>
          <Typography>Jobs</Typography>
          <Typography>Legal Notices</Typography>
          <Typography>Ad Choices</Typography>
        </Box>
        <Box>
          <Typography>Gift Cards</Typography>
          <Typography>Netflix Shop</Typography>
          <Typography>Cookies Preference</Typography>
        </Box>
        <Box>
          <Typography>Media Center</Typography>
          <Typography>Terms of Use</Typography>
          <Typography>Impressum</Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{
            border: "1px solid rgba(255, 255, 255, 0.5)",
            padding: ".2rem .4rem",
            my: "2rem",
            width: "7rem",
          }}
        >
          Service code
        </Typography>
      </Box>
      <Box>© 1997-2024 Netflix, Inc.</Box>
    </Box>
  );
};

export default Footer;

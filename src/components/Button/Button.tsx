import { ButtonProps } from "@/types";
import React from "react";
import { Box } from "@mui/material";

const Button = (props: ButtonProps): React.ReactElement | null => {
  const { filled, label, Icon, rounded, onClick, hidden } = props;

  const backgroundColor = filled ? "white" : "#6d6d6db3";
  const fontColor = filled ? "black" : "white";

  if (hidden) {
    return null;
  }

  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        
        zIndex: 10,
        color: fontColor,
        backgroundColor: backgroundColor,
        width: rounded ? "min-content" : "fit-content",
        padding: rounded ? "0.4rem" : "0.7rem 1.8rem",
        borderRadius: rounded ? "50%" : "0.3rem",
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: rounded ? "0.2rem" : "0.4rem",
        outline: "none",
        border: filled ? "none" : "2.2px solid #ffffff80",
        fontSize: rounded ? "1rem" : "inherit",
        "&:hover": {
          opacity: 0.8,
          backgroundColor: filled ? "#e5e5e5" : backgroundColor,
        },
        "@media (max-width: 600px)": {
          backgroundColor: filled ? "tomato" : backgroundColor,
          padding: rounded ? "0.3rem" : "0.5rem 1.2rem",
        },
      }}
    >
      <Box
        component={Icon}
        sx={{
          fontSize: rounded ? "1rem" : "1.1rem",
          marginRight: !rounded ? "0.8rem" : "0",
        }}
      />
      {!rounded && (
        <Box
          component="span"
          sx={{
            fontWeight: "bold",
            marginLeft: "0.8rem",
            fontSize: "1rem",
            "@media (max-width: 600px)": {
              marginLeft: "0.6rem",
            },
          }}
        >
          {label}
        </Box>
      )}
    </Box>
  );
};

export default Button;

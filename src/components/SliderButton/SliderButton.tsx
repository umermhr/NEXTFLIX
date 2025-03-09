import React from "react";
import { Next, Previous } from "@/utils/icons";
import { Button } from "@mui/material";
import { SliderButtonProps } from "@/types";

const SliderButton: React.FC<SliderButtonProps> = ({ isRight }) => {
  const handleScroll = (event: React.MouseEvent<HTMLButtonElement>) => {
    const parent = event.currentTarget.closest(".scroll-container-parent");
    const scrollContainer = parent?.querySelector(".scroll-container");

    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: isRight ? 300 : -300,
        behavior: "smooth",
      });
      console.log(`Scrolling ${isRight ? "right" : "left"}`);
    } else {
      console.error("Scroll container not found");
    }
  };

  return (
    <Button
      onClick={handleScroll}
      sx={{
        display: { xs: "none", md: "block" },
        color: "white",
        position: "absolute",
        right: isRight ? "0" : "auto",
        left: isRight ? "auto" : "0",
        top: "0",
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,.5)",
        padding: "3.7rem 1rem",
        fontSize: "2rem",
      }}
    >
      {isRight ? <Next /> : <Previous />}
    </Button>
  );
};

export default SliderButton;

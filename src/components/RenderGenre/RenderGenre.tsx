import React from "react";
import GenreLibrary from "@/utils/genre_id";
import { Box, Typography } from "@mui/material";
import { RenderGenreProps } from "@/types";

const RenderGenre: React.FC<RenderGenreProps> = ({ genreIds }) => {
  const genreNames = genreIds
    .map((id) => GenreLibrary.find((genre) => genre.id === id)?.name)
    .filter((name): name is string => name !== undefined);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      <Typography sx={{ fontSize: "10px", color: "#e5e5e5" }}>
        {genreNames.join(" • ")}{" "}
      </Typography>
    </Box>
  );
};

export default RenderGenre;

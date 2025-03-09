"use client";
import Cards from "@/components/Cards/Cards";
import { Media, MediaItem } from "@/types";
import { getMovie } from "@/utils/apiService";
import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const MyListPage: React.FC = () => {
  const [movies, setMovies] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadMovies = async () => {
    setLoading(true);
    const favoriteItems: MediaItem[] = JSON.parse(
      localStorage.getItem("favoriteItems") || "[]"
    );

    if (favoriteItems.length === 0) {
      setError("No movies or TV shows found in your list.");
      setLoading(false);
      return;
    }

    const mediaPromises = favoriteItems.map((item: MediaItem) => {
      const endpoint =
        item.type === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`;
      return getMovie(endpoint);
    });

    const mediaResponses = await Promise.all(mediaPromises);
    const fetchedMedia = mediaResponses
      .filter((response) => response && response.data)
      .map((response) => response.data as unknown as Media);

    setMovies(fetchedMedia);
    setLoading(false);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const removeMovie = (id: number) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      p={2}
      bgcolor="#141414"
      sx={{ textTransform: "capitalize" }}
    >
      <Typography
        component="strong"
        sx={{
          fontSize: "1.2rem",
          marginLeft: "3rem",
          padding: "0.5rem 0",
          width: "fit-content",
          zIndex: 1,
          marginBottom: ".85rem",
        }}
      >
        My Movie List
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="inherit" />
        </Box>
      )}

      {!loading && error && (
        <Typography color="red" sx={{ pl: 6 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
          {movies
            .filter((movie) => movie.poster_path !== null)
            .map((movie) => (
              <Cards
                key={movie.id}
                item={movie}
                removeMovie={removeMovie}
                enableGenres={true}
              />
            ))}
        </Box>
      )}
    </Box>
  );
};

export default MyListPage;

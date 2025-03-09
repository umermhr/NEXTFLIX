"use client";
import { Video } from "@/types";
import { getMovie } from "@/utils/apiService";
import { Box, CircularProgress, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";

const DetailsMoviePage = () => {
  const pathname = usePathname();
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const movieId = pathname.split("/").pop();

  const loadTrailer = async () => {
    const res = await getMovie(`/movie/${movieId}/videos`);

    if (res.error) {
      setError(res.error.message);
      setLoading(false);
    } else {
      const trailer = (res.data?.results as unknown as Video[]).find(
        (video) => video.type === "Trailer"
      );
      setTrailerKey(trailer?.key ?? null);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieId) {
      loadTrailer();
    }
  }, [movieId]);

  return (
    <Box
      sx={{
        backgroundColor: "black",
        height: "85vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "4rem",
      }}
    >
      {loading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="inherit" />
        </Box>
      )}
      {!loading && error && (
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      )}
      {!loading && !error && trailerKey && (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailerKey}`}
          playing
          controls
          width="100%"
          height="100%"
          config={{
            playerVars: {
              autoplay: 1,
              modestbranding: 1,
              showinfo: 0,
            },
          }}
        />
      )}
      {!loading && !error && !trailerKey && (
        <Typography color="white" variant="h6">
          Trailer not available
        </Typography>
      )}
    </Box>
  );
};

export default DetailsMoviePage;

"use client";
import Banner from "@/components/Banner/Banner";
import { MovieSections } from "@/components/MovieSections/MovieSections";
import { MovieSectionProps } from "@/types";
import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        >
          <CircularProgress size={60} sx={{ color: "red" }} />
        </Box>
      )}
      <Banner />
      <Box
        sx={{
          marginTop: "9rem",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#141414",
          color: "white",
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ marginLeft: "0.8rem", zIndex: 0 }}>
          {sections.map((item, index) => (
            <MovieSections
              key={index}
              heading={item.heading}
              endpoint={item.endpoint}
              loading={loading}
              setLoading={setLoading}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

const sections: MovieSectionProps[] = [
  {
    heading: "Top 10 Movies in US Today",
    endpoint: "/movie/top_rated?language=en-US&page=1",
  },
  {
    heading: "Horror Movies",
    endpoint: "/discover/movie?with_genres=27&language=en-US&page=1",
  },
  {
    heading: "Trending Now",
    endpoint: "/trending/movie/week?language=en-US&page=1",
  },
  {
    heading: "Comedies",
    endpoint: "/discover/movie?with_genres=35&language=en-US&page=1",
  },
  {
    heading: "Action",
    endpoint: "/discover/movie?with_genres=28&language=en-US&page=1",
  },
  {
    heading: "Mystery Movies",
    endpoint: "/discover/movie?with_genres=9648&language=en-US&page=1",
  },
  {
    heading: "Drama",
    endpoint: "/discover/movie?with_genres=18&language=en-US&page=1",
  },
  {
    heading: "Adventure",
    endpoint: "/discover/movie?with_genres=12&language=en-US&page=1",
  },
  {
    heading: "Romance",
    endpoint: "/discover/movie?with_genres=10749&language=en-US&page=1",
  },
  {
    heading: "Documentaries",
    endpoint: "/discover/movie?with_genres=99&language=en-US&page=1",
  },
];

export default Home;

import { getMovie } from "@/utils/apiService";
import handleAddToLocalStorage, {
  handleRemoveFromLocalStorage,
  isItemInLocalStorage,
} from "@/utils/localStorage";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CardsProps, Genre, MediaItem, Video } from "../../types";
import { Add, Down, Like, Mute, Play, Tick, Unmute } from "../../utils/icons";
import Button from "../Button/Button";
import ModalComp from "../Modal/Modal";
import RenderGenre from "../RenderGenre/RenderGenre";
import ReactPlayer from "react-player";

const Cards: React.FC<CardsProps> = ({ item, enableGenres, removeMovie }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [, setError] = useState<string | null>(null);

  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isInLocalStorage, setIsInLocalStorage] = useState<boolean>(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const router = useRouter();
  const { title, vote_average, genre_ids, id, backdrop_path } = item;
  const image = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  useEffect(() => {
    setIsMounted(true);
    setIsInLocalStorage(
      isItemInLocalStorage(item.id, item.title ? "movie" : "tv")
    );
    if (enableGenres) {
      setGenres(item.genres || []); // Ensure genres is always an array
    }
  }, [item, enableGenres]);

  const handlePlayClick = () => {
    if (item?.id && isMounted) {
      router.push(`/movie/${item.id}`);
    }
  };

  const fetchTrailer = async () => {
    const res = await getMovie(`/movie/${id}/videos`);
    if (res.error) {
      setError(res.error.message);
    } else {
      const trailer = (res.data?.results as unknown as Video[]).find(
        (video) => video.type === "Trailer"
      );
      setTrailerKey(trailer ? trailer.key : null);
    }
  };

  useEffect(() => {
    if (isHovered) {
      fetchTrailer();
    }
  }, [isHovered]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleFavoriteToggle = () => {
    const mediaItem: MediaItem = {
      id,
      title,
      type: item.title ? "movie" : "tv",
    }; // Added `type`
    if (isInLocalStorage) {
      handleRemoveFromLocalStorage(mediaItem);
      setIsInLocalStorage(false);
      removeMovie?.(mediaItem.id); // Optional chaining
    } else {
      handleAddToLocalStorage(mediaItem);
      setIsInLocalStorage(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          width: "14rem",
          height: "9rem",
          borderRadius: "0.28rem",
          marginRight: "0.3rem",
          cursor: "pointer",
          transition: "all 300ms ease",
          backgroundColor: "#252525",
          zIndex: isHovered ? 10 : 1,
          "&:hover": {
            transform: "scale(1.45)",
            boxShadow:
              "0 0 1rem rgba(0, 0, 0, 0.6), 0 6px 6px rgba(0, 0, 0, 0.5)",
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && trailerKey ? (
          <Box sx={{ position: "relative" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailerKey}`}
              playing={true}
              muted={isMuted}
              controls={false}
              width="100%"
              height="100%"
              style={{ borderRadius: "0.28rem" }}
            />
            <Box
              sx={{
                position: "absolute",
                zIndex: "11",
                bottom: "10%",
                right: "5%",
              }}
            >
              <Button
                Icon={isMuted ? Mute : Unmute}
                rounded
                onClick={toggleMute}
              />
            </Box>
          </Box>
        ) : (
          <Image
            src={image}
            alt="Top movie poster"
            width={450}
            height={350}
            style={{
              borderRadius: "0.28rem",
              objectFit: "cover",
              width: "100%",
              height: "100%",
              objectPosition: "top",
            }}
          />
        )}

        <Box
          sx={{
            display: isHovered ? "flex" : "none",
            flexDirection: "column",
            backgroundColor: "#252525",
            borderRadius: "0 0 0.28rem 0.28rem",
            p: "0.4rem",
            fontSize: "inherit",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: "15%",
              inset: 0,
              backgroundImage: "linear-gradient(to top, black, transparent)",
            }}
          />
          <Typography
            component="strong"
            sx={{
              fontWeight: "bold",
              color: "white",
              fontSize: "14px",
              mt: 1,
              position: "absolute",
              bottom: "15%",
            }}
          >
            {title}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex" }}>
              <Button Icon={Play} rounded onClick={handlePlayClick} />
              <Button
                Icon={isInLocalStorage ? Tick : Add}
                rounded
                onClick={handleFavoriteToggle}
              />
              <Button Icon={Like} rounded />
            </Box>

            <Button Icon={Down} rounded onClick={handleOpen} />
          </Box>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
              <Typography
                sx={{
                  color: "success.main",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                }}
              >{`${Math.round(vote_average * 10)}% match`}</Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", pb: 2 }}>
              <Typography sx={{ fontSize: "10px", mr: 1 }}>Genres:</Typography>
              {enableGenres ? (
                <Typography sx={{ fontSize: "10px" }}>
                  {genres.slice(0, 5).map(({ name }, index) => (
                    <span key={name}>
                      {name}
                      {index < genres.length - 1 && <span> &bull; </span>}
                    </span>
                  ))}
                </Typography>
              ) : (
                <RenderGenre genreIds={genre_ids} />
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <ModalComp
        modalOpen={modalOpen}
        handleClose={handleClose}
        modalData={item}
        enableGenres={enableGenres ?? false}
      />
    </>
  );
};

export default Cards;

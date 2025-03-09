import React, { useEffect, useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button/Button";
import RenderGenre from "../RenderGenre/RenderGenre";
import SimilarMedia from "../SimilarMedia/SimilarMedia";
import { MediaItem, ModalProps, Video } from "@/types";
import { getMovie } from "@/utils/apiService";
import {
  Add,
  Adult,
  Dislike,
  Like,
  Mute,
  Play,
  Tick,
  Unmute,
  HD,
  Close,
} from "@/utils/icons";
import handleAddToLocalStorage, {
  handleRemoveFromLocalStorage,
} from "@/utils/localStorage";
import ReactPlayer from "react-player";

const ModalComp: React.FC<ModalProps> = ({
  modalOpen,
  handleClose,
  modalData,
  enableGenres,
}): React.ReactElement => {
  const [, setLoading] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const {
    id,
    backdrop_path,
    title,
    overview,
    vote_average,
    genres,
    genre_ids,
    release_date,
    adult,
  } = modalData;
  const [isInLocalStorage, setIsInLocalStorage] = useState<boolean>(false);

  const banner = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  const handleAddOrRemove = () => {
    const mediaType = title ? "movie" : "tv";
    const mediaItem: MediaItem = {
      id,
      type: mediaType,
      title: title,
    };

    if (isInLocalStorage) {
      handleRemoveFromLocalStorage(mediaItem);
    } else {
      handleAddToLocalStorage(mediaItem);
    }
    setIsInLocalStorage(!isInLocalStorage);
  };

  const fetchTrailer = async () => {
    const res = await getMovie(`/movie/${id}/videos`);
    const trailer = (res.data?.results as unknown as Video[])?.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    setTrailerUrl(
      trailer
        ? `https://www.youtube.com/embed/${
            trailer.key
          }?autoplay=1&controls=0&mute=${isMuted ? 1 : 0}`
        : null
    );
    setLoading(false);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  useEffect(() => {
    fetchTrailer();
  }, [id]);

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        marginTop: "2rem",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: { xs: "40%", md: "50%" },
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", md: "75%", lg: "60%" },
          backgroundColor: "#141414",
          boxShadow: 24,
          height: "65vh",
          borderRadius: 1,
          outline: "none",
        }}
      >
        <Box
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: "8px",
            right: "8px",
            cursor: "pointer",
            color: "#ffffff",
            zIndex: 1,
          }}
        >
          <Close fontSize="30px" />
        </Box>

        <Box sx={{ position: "relative" }}>
          {trailerUrl ? (
            <ReactPlayer
              url={trailerUrl}
              muted={isMuted}
              playing={true}
              loop
              width="100%"
              height="400px"
              style={{ borderRadius: "8px 8px 0 0" }}
            />
          ) : (
            <Image
              width={600}
              height={400}
              src={banner}
              alt="spotlight"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          )}

          <Box
            sx={{
              p: 6,
              display: "flex",
              position: "absolute",
              bottom: "0",
              alignItems: "baseline",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: { md: 2 },
                alignItems: "baseline",
              }}
            >
              <Link style={{ textDecoration: "none" }} href={`/movie/${id}`}>
                <Button label="Play" filled Icon={Play} />
              </Link>
              <Button
                Icon={isInLocalStorage ? Tick : Add}
                rounded
                onClick={handleAddOrRemove}
              />
              <Button Icon={Like} rounded />
              <Button Icon={Dislike} rounded />
            </Box>
          </Box>
          <Box
            sx={{
              position: "absolute",
              right: "0",
              bottom: "0",
              p: { xs: 2, md: 6 },
            }}
          >
            <Button
              Icon={isMuted ? Mute : Unmute}
              rounded
              onClick={toggleMute}
            />
          </Box>
        </Box>

        <Box sx={{ backgroundColor: "#141414", p: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Box
              sx={{
                display: { xs: "block", md: "flex" },
                alignItems: "baseline",
                gap: { xs: "2px", md: "10px" },
              }}
            >
              <Typography
                sx={{ color: "success.main", fontWeight: "bold", mt: 1 }}
              >
                {Math.round(vote_average * 10)}% Match
              </Typography>
              <Typography sx={{ fontSize: "15px", color: "#e5e5e5" }}>
                {release_date}
              </Typography>
              {adult && <Button Icon={Adult} rounded />}
              <Typography
                sx={{ border: "2px solid #e5e5e5", color: "#e5e5e5" }}
              >
                12+
              </Typography>
              <Typography
                sx={{ fontSize: "16px", color: "#e5e5e5", fontWeight: "bold" }}
              >
                120m
              </Typography>
              <HD
                style={{
                  fontSize: "20px",
                  color: "#e5e5e5",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontSize: "10px", mr: 1, color: "#e5e5e5" }}>
                Genres:
              </Typography>
              {enableGenres ? (
                <Typography sx={{ fontSize: "15px", color: "#e5e5e5" }}>
                  {genres?.slice(0, 5).map(({ name }, index) => (
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
          <Typography
            id="modal-modal-description"
            sx={{ my: 2, color: "#ffffff80" }}
          >
            {overview}
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#e5e5e5",
              fontSize: "1.3rem",
            }}
          >
            More movies like this
          </Typography>

          <SimilarMedia id={id} />
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalComp;

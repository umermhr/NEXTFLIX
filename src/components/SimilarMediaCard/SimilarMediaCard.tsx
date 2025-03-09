import { CardsProps } from "@/types";
import { Play } from "@/utils/icons";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Button from "../Button/Button";

const SimilarMediaCard: React.FC<CardsProps> = ({ item }) => {
  const { id, title, poster_path, overview, vote_average } = item;

  const imageUrl = `https://image.tmdb.org/t/p/original${poster_path}`;

  return (
    <Card
      sx={{ maxWidth: 345, backgroundColor: "#252525", position: "relative" }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          inset: 0,
          backgroundImage: "linear-gradient(to top, black, transparent)",
        }}
      />

      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={title}
          sx={{ objectPosition: "top" }}
        />
        <CardContent
          sx={{ color: "#ffffff80", position: "relative", zIndex: 2 }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              color: "#ffffff",
              zIndex: 2,
              fontWeight: { xs: ".85rem", md: "1.5rem" },
            }}
          >
            {title.slice(0, 12)}...
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ color: "#53d853" }}>
              {`${Math.round(vote_average * 10)}% Match`}
            </Typography>
            <Link style={{ textDecoration: "none" }} href={`/movie/${id}`}>
              <Button Icon={Play} rounded />
            </Link>
          </Box>
          <Typography variant="body2">{overview.slice(0, 60)}. . .</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SimilarMediaCard;

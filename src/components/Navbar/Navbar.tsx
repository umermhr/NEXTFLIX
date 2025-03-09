"use client";
import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const pages = [
  "Home",
  "TV Shows",
  "Movie",
  "New & Popular",
  "My List",
  "Browse by Languages",
];

const Navbar = () => {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showClearIcon, setShowClearIcon] = useState<string>("none");

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    setShowClearIcon(value ? "block" : "none");
  };

  const handleClick = () => {
    setSearchQuery("");
    setShowClearIcon("none");
  };

  const handleSearchKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && searchQuery.trim()) {
      event.preventDefault();
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "rgba(0,0,0,0.65)",
        top: 0,
        transition: "background-color 0.3s",
        "&:hover": {
          backgroundColor: "#000",
          opacity: 1,
        },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Image
            width={100}
            height={50}
            src={"/assets/logo.png"}
            alt="Logo"
            style={{ position: "relative", zIndex: 1 }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ borderRadius: 0 }}
                >
                  <Typography sx={{ textAlign: "center", color: "black" }}>
                    <Link
                      href={
                        page === "Home"
                          ? "/"
                          : page === "My List"
                          ? "/my_list"
                          : "#" // Placeholder links
                      }
                      passHref
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      <Box
                        sx={{
                          opacity: 0.9,
                          cursor: "pointer",
                          padding: "0.6rem 0.9rem",
                          "&:hover": {
                            borderColor: "#fff",
                          },
                        }}
                      >
                        {page}
                      </Box>
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link
                key={page}
                href={
                  page === "Home" ? "/" : page === "My List" ? "/my_list" : "#"
                }
                passHref
                style={{
                  textDecoration: "none",
                  color: "#ffffff",
                }}
              >
                <Box
                  sx={{
                    opacity: 0.9,
                    cursor: "pointer",
                    padding: "0.6rem 0.9rem",
                    "&:hover": {
                      fontWeight: 500,
                      borderColor: "#fff",
                    },
                  }}
                >
                  {page}
                </Box>
              </Link>
            ))}
          </Box>

          <FormControl
            sx={{ marginRight: "10px", backgroundColor: "#2a2a2a99" }}
          >
            <TextField
              size="small"
              variant="outlined"
              value={searchQuery}
              placeholder="Search"
              onChange={handleChange}
              onKeyPress={handleSearchKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#ffffff80" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ display: showClearIcon }}
                    onClick={handleClick}
                  >
                    <ClearIcon sx={{ color: "#ffffff80", cursor: "pointer" }} />
                  </InputAdornment>
                ),
                style: { color: "#FFFFFF" },
              }}
              sx={{
                "& .MuiInputBase-input": {
                  color: "#FFFFFF",
                },
              }}
            />
          </FormControl>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  alt="User Avatar"
                  src="/assets/avatar.png"
                  sx={{ borderRadius: "5px", width: 40, height: 40 }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

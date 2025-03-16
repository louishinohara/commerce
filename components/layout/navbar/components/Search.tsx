"use client";

import { Close as CloseIcon, Search as SearchIcon } from "@mui/icons-material";
import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface SearchProps {
  alwaysExpanded?: boolean;
  autoFocus?: boolean;
  isMobile?: boolean;
  setMenuOpen?: () => void;
  width?: number | "100%";
}

export default function Search({
  alwaysExpanded = false,
  autoFocus = false,
  isMobile = false,
  setMenuOpen = () => { },
  width = 240,
}: SearchProps) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(alwaysExpanded);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((expanded || autoFocus) && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded, autoFocus]);

  useEffect(() => {
    if (alwaysExpanded || !expanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expanded, alwaysExpanded]);

  const handleOnClick = () => {
    if (isMobile) {
      setMenuOpen();
    } else {
      setExpanded((prev) => !prev);
    }
  };

  const handleClose = () => {
    if (!alwaysExpanded) {
      setExpanded(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape" && !alwaysExpanded) {
      setExpanded(false);
    } else if (event.key === "Enter" && inputRef.current?.value.trim()) {
      event.preventDefault(); // Prevent default form submission
      const query = inputRef.current.value.trim();
      window.location.href = `/search?q=${encodeURIComponent(query)}`; // Navigate to search results
    }
  };

  const isExpanded = expanded || alwaysExpanded;

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: isExpanded ? (isMobile ? "100%" : width) : 40,
        height: 36,
        borderRadius: "18px",
        border: isExpanded ? `1px solid ${theme.palette.divider}` : "none",
        backgroundColor: isExpanded ? theme.palette.background.paper : "transparent",
        ...(isExpanded && {
          backdropFilter: "blur(4px)",
          backgroundColor: theme.palette.mode === "dark"
            ? "rgba(30, 30, 30, 0.8)"
            : "rgba(255, 255, 255, 0.8)",
        }),
        transition: "all 0.3s ease-in-out",
        overflow: "hidden",
      }}
      onKeyDown={handleKeyDown}
    >
      {/* Search Icon Container */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          pl: 1,
          color: theme.palette.text.secondary,
        }}
      >
        {isExpanded ? (
          <SearchIcon fontSize="small" />
        ) : (
          <IconButton
            onClick={handleOnClick}
            size="small"
            sx={{
              p: 0.5,
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "scale(1.1)" },
            }}
            aria-label="Open search"
          >
            <SearchIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* Input Field */}
      <InputBase
        inputRef={inputRef}
        placeholder="Search..."
        sx={{
          flex: 1,
          ml: 0.5,
          mr: 1,
          fontSize: isMobile ? "16px" : "0.875rem",
          color: theme.palette.text.primary,
          transition: "opacity 0.2s ease-in-out",
          opacity: isExpanded ? 1 : 0,
          width: isExpanded ? "100%" : 0,
          "& .MuiInputBase-input": {
            padding: "0 8px",
            border: "none",
            backgroundColor: "transparent",
            fontSize: isMobile ? "16px" : "0.875rem",
            "&::placeholder": {
              color: theme.palette.text.secondary,
              opacity: 0.7,
            },
            "&:focus": {
              outline: "none",
              boxShadow: "none",
              border: "none",
            },
          },
        }}
        inputProps={{
          "aria-label": "search",
          disabled: !isExpanded,
        }}
      />

      {/* Close Button */}
      {isExpanded && (
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            p: 0.5,
            mr: 0.5,
            transition: "transform 0.2s ease-in-out",
            "&:hover": { transform: "scale(1.1)" },
          }}
          aria-label="Close search"
        >
          <CloseIcon sx={{ fontSize: "16px" }} />
        </IconButton>
      )}
    </Box>
  );
}
"use client";

import { Box, Button, Typography, useTheme } from "@mui/material";
import useIsMobile from "components/hooks/useIsMobile";
import { useEffect, useState } from "react";

// Define the TypeScript type for the JSON data
interface HeroContent {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl?: string; // Optional in case it's missing
}

export default function LandingPage() {
  const theme = useTheme();
  const isMobile = useIsMobile();

  // Define useState with the correct type
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);

  useEffect(() => {
    fetch("/data/landingPage.json") // ✅ Fetch from `public` folder
      .then((response) => response.json())
      .then((data: HeroContent) => setHeroContent(data))
      .catch((error) => console.error("Error fetching hero content:", error));
  }, []);

  if (!heroContent) return null; // Prevent rendering before data loads

  return (
    <Box
      sx={{
        position: "relative",
        height: "80vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url('${heroContent.imageUrl || "/images/landingPage/image1.jpg"}')`, // ✅ Uses JSON data
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      />

      {/* Subtle Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4))",
          zIndex: -1,
        }}
      />

      {/* Hero Section - Bottom-Left Alignment */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          height: "100%",
          padding: theme.spacing(4),
          textAlign: "left",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: isMobile ? "1.4rem" : "2rem",
            color: "white",
            fontWeight: 400,
            marginBottom: 1.5,
            textTransform: "none",
          }}
        >
          {heroContent.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            maxWidth: 600,
            marginBottom: 3,
            textTransform: "none",
          }}
        >
          {heroContent.description}
        </Typography>

        <Button
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            fontSize: "0.9rem",
            paddingX: 3,
            paddingY: 1,
            borderRadius: 4,
            textTransform: "none",
            "&:hover": {
              borderColor: "white",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
          href={heroContent.buttonLink} // ✅ No more TypeScript error!
        >
          {heroContent.buttonText}
        </Button>
      </Box>
    </Box>
  );
}

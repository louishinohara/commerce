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
        fetch("/data/landingPage/data.json")
            .then((response) => response.json())
            .then((data: HeroContent) => setHeroContent(data))
            .catch((error) => console.error("Error fetching hero content:", error));
    }, []);

    if (!heroContent) return null;

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
                    backgroundImage: `url('${heroContent.imageUrl || "/images/landingPage/image1.jpg"}')`, 
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
                    background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2))",
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
                        fontFamily: '"Playfair Display", serif',
                        fontSize: isMobile ? "1.4rem" : "2.3rem",
                        fontWeight: 700,
                        letterSpacing: isMobile ? "0.02rem" : "0.05rem",
                        color: "white",
                        marginBottom: 1.5,
                        textTransform: "none",
                    }}
                >
                    {heroContent.title}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        fontSize: isMobile ? "1rem" : "1.2rem",
                        fontWeight: 400,
                        fontStyle: "italic",
                        color: "rgba(255, 255, 255, 0.8)",
                        maxWidth: 600,
                        marginBottom: 3,
                    }}
                >
                    {heroContent.description}
                </Typography>

                <Button
                    variant="outlined"
                    sx={{
                        color: "rgba(255, 255, 255, 0.9)", // Slightly off-white for a softer look
                        borderColor: "rgba(255, 255, 255, 0.5)", // Subtle border
                        fontSize: "0.85rem", // Slightly smaller text
                        paddingX: 3.5, // Balanced width
                        paddingY: 0.7, // Reduced height
                        borderRadius: "40px", // Soft curves, but not too bulky
                        textTransform: "none",
                        letterSpacing: "0.05rem",
                        backdropFilter: "blur(6px)", // Subtle glass effect
                        backgroundColor: "rgba(255, 255, 255, 0.04)", // Slight transparency
                        transition: "all 0.25s ease-in-out",
                        "&:hover": {
                            borderColor: "rgba(255, 255, 255, 0.8)",
                            backgroundColor: "rgba(255, 255, 255, 0.08)", // Softer hover effect
                            transform: "scale(1.04)", // Slight scaling, but not over the top
                        },
                    }}
                    href={heroContent.buttonLink}
                >
                    {heroContent.buttonText}
                </Button>
            </Box>
        </Box>
    );
}

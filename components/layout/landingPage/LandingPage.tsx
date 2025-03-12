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
                    sx={{
                        color: "#121212",
                        backgroundColor: "rgba(255, 255, 255, 0.88)",
                        fontSize: "0.85rem",
                        fontWeight: "500",
                        paddingX: 4,
                        paddingY: 1,
                        borderRadius: "36px", // Slightly more refined curves
                        textTransform: "none",
                        letterSpacing: "0.03rem",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.08)", // Subtle depth without overpowering
                        transition: "all 0.3s ease-in-out",
                        backdropFilter: "blur(8px)", // Soft diffusion effect
                        "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.95)", // Slightly more opaque on hover
                            boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.12)", // A gentle lift effect
                            transform: "scale(1.03)", // Subtle interaction feedback
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

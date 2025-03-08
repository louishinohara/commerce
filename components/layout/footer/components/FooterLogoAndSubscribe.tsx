"use client";

import { ArrowForwardIos as ArrowIcon } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function FooterLogoAndSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // Log the response for debugging
      console.log("Response:", res);

      if (!res.ok) {
        throw new Error("Subscription failed");
      }

      const data = await res.json();
      console.log("Subscription successful:", data);

      setStatus("success");
      setEmail("");

      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus("error");

      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }
  };

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="flex-start" // Align items to the left
      textAlign="left" // Align text to the left
    >
      {/* Company Name */}
      <Link href="/" style={{ textDecoration: "none" }}>
        <Typography variant="h5" fontWeight="bold" letterSpacing="0.05em" color="text.primary">
          {process.env.NEXT_PUBLIC_COMPANY_NAME}
        </Typography>
      </Link>

      {/* Subtitle */}
      <Typography variant="body2" color="text.secondary" mt={1}>
        Stay updated with exclusive deals!
      </Typography>

      {/* Subscribe Form */}
      <Box component="form" onSubmit={handleSubmit} width="100%" maxWidth="400px" mt={2}>
        <TextField
          fullWidth
          type="email"
          variant="outlined"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="submit"
                  color="inherit"
                  onClick={(e) => handleSubmit(e as any)} // Fix type issue
                  sx={{
                    p: "6px",
                    transition: "opacity 0.2s ease-in-out",
                    "&:hover": { opacity: 0.7 },
                  }}
                >
                  <ArrowIcon fontSize="small" sx={{ fontSize: "1rem", color: "text.secondary" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            fontSize: "0.9rem",
            bgcolor: "background.paper", // Use theme's background.paper for consistency
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255,255,255,0.1)", // Minimal border
                transition: "border-color 0.3s ease-in-out", // Smooth transition for border
              },
              "&:hover fieldset": {
                borderColor: "rgba(255,255,255,0.2)", // Slightly darker on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main", // Highlight on focus
              },
            },
            "& .MuiInputBase-input": {
              padding: "8px 12px", // Add padding for better spacing
              color: "text.primary",
            },
            width: "100%", // Ensure the input field spans the entire container
          }}
        />
      </Box>

      {/* Status Messages with Transition */}
      <Box
        sx={{
          mt: 1,
          height: "24px", // Fixed height to prevent layout shift
          overflow: "hidden",
        }}
      >
        <Typography
          variant="caption"
          color="success.main"
          sx={{
            opacity: status === "success" ? 1 : 0, // Fade in/out based on status
            transition: "opacity 0.3s ease-in-out", // Smooth transition
          }}
        >
          Subscription successful!
        </Typography>
        <Typography
          variant="caption"
          color="error.main"
          sx={{
            opacity: status === "error" ? 1 : 0, // Fade in/out based on status
            transition: "opacity 0.3s ease-in-out", // Smooth transition
          }}
        >
          Subscription failed. Please try again.
        </Typography>
      </Box>
    </Box>
  );
}
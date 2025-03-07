"use client";

import { Close as CloseIcon } from "@mui/icons-material";
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import FooterSocialIcons from "components/layout/footer/FooterSocialIcons";
import LogoSquare from "components/logo-square";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Search from "./Search";


export default function MobileMenu({
  menu,
  isOpen,
  setIsOpen,
  companyName,
}: {
  menu: any[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  companyName: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const theme = useTheme();

  // Close menu on route change
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [pathname, searchParams]);

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: "85%",
          maxWidth: 320,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      {/* Header Section (Logo, Company Name, Close Button) */}
      <Box display="flex" alignItems="center" justifyContent="space-between" px={2} py={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <LogoSquare />
          <Typography variant="h6" sx={{ textTransform: "uppercase", fontWeight: 500 }}>
            {companyName}
          </Typography>
        </Box>
        <IconButton onClick={() => setIsOpen(false)} aria-label="Close menu">
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* Search Bar (Always Expanded) */}
      <Box px={2} py={2}>
        <Search alwaysExpanded />
      </Box>

      <Divider />

      {/* Menu Items */}
      <List>
        {menu.map((item) => (
          <ListItem
            key={item.title}
            component={Link}
            href={item.path}
            onClick={() => setIsOpen(false)}
            sx={{
              textAlign: "center",
              "&:hover": { backgroundColor: theme.palette.action.hover },
            }}
          >
            <ListItemText
              primary={item.title}
              sx={{
                textTransform: "uppercase",
                fontWeight: "medium",
                textAlign: "center",
              }}
            />
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Footer (Company Name & Social Icons) */}
      <Box textAlign="center" py={2}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          &copy; {new Date().getFullYear()} {companyName}
        </Typography>
        <FooterSocialIcons />

      </Box>
    </Drawer>
  );
}

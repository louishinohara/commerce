"use client";

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme
} from "@mui/material";
import FooterBottomSection from "components/layout/footer/FooterBottomSection";
import ThemeToggle from "components/theme/ThemeToggle";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Search from "./Search";

export default function MobileMenu({
  isOpen,
  setIsOpen,
  companyName,
  menuItems,
  atTop
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  companyName: string;
  menuItems: { title: string; path: string; category: string }[];
  atTop: boolean;
}) {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const theme = useTheme();

  // Close menu on route change
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [pathname, searchParams]);

  // Filter menu items by category
  const primaryMenu = menuItems.filter((item) => item.category === "primary");
  const secondaryMenu = menuItems.filter((item) => item.category === "secondary");

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      ModalProps={{ keepMounted: true }}
      BackdropProps={{ invisible: true }}
      sx={{
        "& .MuiDrawer-paper": {
          width: "100%",
          display: "flex",
          height: "calc(100% - 48px)",
          marginTop: "48px",
          flexDirection: "column",
          // Remove the default Paper overlay:
          backgroundImage: "none !important",
          // Then set whatever background color you’d like:
          backgroundColor: atTop
            ? theme.palette.background.default
            : theme.palette.background.paper,

          color: theme.palette.text.primary,
          boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }
      }}
    >

      <Box
        px={2}
        py={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Search alwaysExpanded width="100%" />
        <ThemeToggle />
      </Box>

      {/* Primary Menu Items */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", px: 2 }}>
        <List>
          {primaryMenu.map((item) => (
            <ListItem
              key={item.title}
              component={Link}
              href={item.path}
              onClick={() => setIsOpen(false)}
              sx={{
                "&:hover": { backgroundColor: theme.palette.action.hover },
                px: 0
              }}
            >
              <ListItemText
                primary={item.title}
                sx={{
                  fontWeight: "medium",
                  textAlign: "left",
                  fontSize: "1.2rem"
                }}
              />
            </ListItem>
          ))}
        </List>

        {/* Divider Between Primary and Secondary Menu */}
        {secondaryMenu.length > 0 && (
          <Divider
            sx={{
              my: 2,
              width: "100%",
              borderBottomWidth: "2px",
              borderColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(0, 0, 0, 0.1)",
              mx: "auto"
            }}
          />
        )}

        {/* Secondary Menu Items */}
        <List>
          {secondaryMenu.map((item) => (
            <ListItem
              key={item.title}
              component={Link}
              href={item.path}
              onClick={() => setIsOpen(false)}
              sx={{
                "&:hover": { backgroundColor: theme.palette.action.hover },
                px: 0
              }}
            >
              <ListItemText
                primary={item.title}
                sx={{
                  fontWeight: "medium",
                  textAlign: "left",
                  fontSize: "1.2rem"
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ width: "100%", mt: "auto", pb: 0, mb: 0 }}>
        <FooterBottomSection
          companyName={companyName}
          displayYear={currentYear}
          sizeInRem={0.8}
        />
      </Box>
    </Drawer >
  );
}

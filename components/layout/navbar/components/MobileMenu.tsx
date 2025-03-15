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
import { alpha } from "@mui/material/styles";
import FooterBottomSection from "components/layout/footer/FooterBottomSection";
import ThemeToggle from "components/theme/ThemeToggle";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import menuData from "../../../../lib/data/menu/data.json";
import Search from "./Search";

interface PageData {
  title: string;
  path: string;
  isMobile?: boolean;
}
interface MenuData {
  pages: Record<string, PageData>;
  deskTopMenu: string[];
  primaryMenu: string[];
  secondaryMenu: string[];
  footerMenu: { title: string; menu: string[] }[];
}

export default function MobileMenu({
  isOpen,
  setIsOpen,
  companyName,
  atTop
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  companyName: string;
  atTop: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const theme = useTheme();

  const typedMenuData: MenuData = menuData;

  const { primaryMenu, secondaryMenu } = useMemo(() => {
  if (!typedMenuData || !typedMenuData.pages || !typedMenuData.primaryMenu || !typedMenuData.secondaryMenu) {
    console.error("Invalid menu data:", typedMenuData);
    return { primaryMenu: [], secondaryMenu: [] };
  }

  return {
    primaryMenu: typedMenuData.primaryMenu
      .map((key) => typedMenuData.pages[key]) // ✅ Now TypeScript allows this!
      .filter((item): item is PageData => item !== undefined),

    secondaryMenu: typedMenuData.secondaryMenu
      .map((key) => typedMenuData.pages[key])
      .filter((item): item is PageData => item !== undefined)
      .sort((a, b) => a.title.localeCompare(b.title)),
  };
}, []);

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
      ModalProps={{ keepMounted: true }}
      BackdropProps={{ invisible: true }}
      sx={{
        "& .MuiDrawer-paper": {
          width: "100%",
          display: "flex",
          height: "calc(100% - 48px)",
          marginTop: "48px",
          flexDirection: "column",
          backgroundImage: "none !important",
          backgroundColor: atTop
            ? "rgba(0, 0, 0, 0.8)"
            : alpha(theme.palette.background.default, 0.93),
          color: theme.palette.text.primary,
          boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)",
          position: "relative",
          backdropFilter: "blur(10px)", // Optional: Adds a frosted glass effect
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
          displayYear={new Date().getFullYear()}
          sizeInRem={0.8}
        />
      </Box>
    </Drawer>
  );
}

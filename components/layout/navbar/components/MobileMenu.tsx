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

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      ModalProps={{ keepMounted: true }} // ✅ Prevents unmounting
      BackdropProps={{ invisible: true }} // ✅ Removes the backdrop
      sx={{
        "& .MuiDrawer-paper": {
          width: "100%",
          display: "flex",
          height: "calc(100% - 56px)", // ✅ Start below the navbar
          marginTop: "56px", // ✅ Matches navbar height
          flexDirection: "column",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)",
          position: "relative",
        },
      }}
    >
      {/* Search Bar (Always Expanded, Centered with Padding) */}
      <Box px={2} py={1} display="flex" justifyContent="center">
        <Search alwaysExpanded width="100%" />
      </Box>

      <Divider />

      {/* Menu Items */}
      <List sx={{ flexGrow: 1 }}>
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
      <FooterBottomSection companyName={companyName} displayYear={currentYear} sizeInRem={0.8} />
    </Drawer>
  );
}

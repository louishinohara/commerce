"use client";

import {
  Backdrop,
  Box,
  Drawer,
  IconButton, Typography,
  useTheme,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import CartContents from "components/cart/components/CartContents";
import EmptyCart from "components/cart/components/EmptyCart";
import useIsMobile from "components/hooks/useIsMobile";

export default function CartMenu({ cartOpen, cart, toggleCart }: {
  toggleCart: () => void;
  cart: any;
  cartOpen: boolean;
  atTop: boolean;
}) {
  const isMobile = useIsMobile();
  const theme = useTheme();

  return (
    <>
      {
        !isMobile ?
          <Backdrop
            open={cartOpen}
            onClick={toggleCart}
            sx={{
              zIndex: 1099,
              backgroundColor: "rgba(0, 0, 0, 0)",
              backdropFilter: "blur(2px)",
              transition: "opacity 0.3s ease-in-out",
              position: "fixed",
              left: 0,
              top: 0,
              width: "100vw",
              height: "100vh",
            }}
          /> : null
      }

      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={toggleCart}
        ModalProps={{ keepMounted: true }}
        BackdropProps={{ invisible: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: isMobile ? "100%" : "40%",
            maxWidth: "500px",
            display: "flex",
            height: isMobile ? "calc(100% - 48px)" : "100%",
            marginTop: isMobile ? "48px" : "0px",
            flexDirection: "column",
            backgroundImage: "none !important",
            backgroundColor: "rgba(0, 0, 0, 0.999)",
            color: theme.palette.text.primary,
            boxShadow: "-4px 0 10px rgba(0, 0, 0, 0.1)",
            position: "fixed",
            right: 0,
            top: 0,
            bottom: 0,
          },
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          px={2}
          height={65}
          borderBottom={`1px solid ${theme.palette.divider}`}
        >
          {/* Cart Title aligned left */}
          <Typography variant="h6" fontWeight={500} flex={1}>
            Cart · {cart?.totalQuantity || 0} {cart?.totalQuantity === 1 ? "Item" : "Items"}
          </Typography>

          {/* Close button aligned right (only on desktop) */}
          {!isMobile && (
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={toggleCart} aria-label="Close cart">
                <CloseIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        <Box flex={1} p={2} display="flex" flexDirection="column">
          {cart?.lines?.length > 0 ? <CartContents cart={cart} toggleCart={toggleCart} /> : <EmptyCart />}
        </Box>
      </Drawer>
    </>

  );
}
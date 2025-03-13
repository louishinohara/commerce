import CloseIcon from "@mui/icons-material/Close";
import { Box, Drawer, IconButton, useTheme } from "@mui/material";
import CartContents from "./CartContents";
import CartHeader from "./CartHeader";
import EmptyCart from "./EmptyCart";

export default function SlideInPanel({ closeCart, cart }: { closeCart: () => void; cart: any }) {
  const theme = useTheme();

  return (
    <Drawer
      anchor="right"
      open={true}
      onClose={closeCart}
      transitionDuration={200}
      PaperProps={{
        sx: {
          width: 390,
          maxWidth: "100%",
          height: "100vh",
          backgroundColor: theme.palette.mode === "dark" ? "#111" : "#fff",
          boxShadow: "-4px 0px 12px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        },
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={2}
        py={2}
        borderBottom={`1px solid ${theme.palette.divider}`}
      >
        <CartHeader closeCart={closeCart} />
        <IconButton onClick={closeCart} aria-label="Close cart">
          <CloseIcon />
        </IconButton>
      </Box>

      <Box flex={1} p={2} display="flex" flexDirection="column">
        {cart?.lines?.length > 0 ? <CartContents cart={cart} /> : <EmptyCart />}
      </Box>
    </Drawer>
  );
}

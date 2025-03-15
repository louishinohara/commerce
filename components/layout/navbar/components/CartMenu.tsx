"use client";

// import {
//   Backdrop,
//   Box,
//   Drawer,
//   useTheme
// } from "@mui/material";

// import CartContents from "components/cart/components/CartContents";
// import EmptyCart from "components/cart/components/EmptyCart";
// import useIsMobile from "components/hooks/useIsMobile";
// import { usePathname, useSearchParams } from "next/navigation";

// export default function CartMenu({ atTop, cartOpen, cart, toggleCart }: {
//   toggleCart: () => void;
//   cart: any;
//   cartOpen: boolean;
//   atTop: boolean;
// }) {
//   const isMobile = useIsMobile();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const theme = useTheme();

//   return (
//     <>
//       <Backdrop
//         open={isMobile && cartOpen}
//         onClick={toggleCart}
//         sx={{
//           zIndex: 1099,
//           backgroundColor: "rgba(0, 0, 0, 0.01)",
//           backdropFilter: "blur(1px)",
//           transition: "opacity 0.3s ease-in-out",
//           position: "fixed",
//           left: 0,
//           width: "100vw",
//           height: "100vh",
//         }}
//       />

//       {/* ✅ Cart Drawer */}
//       <Drawer
//         anchor="right"
//         open={cartOpen}
//         onClose={toggleCart}
//         ModalProps={{ keepMounted: true }}
//         sx={{
//           zIndex: 1200,
//           "& .MuiDrawer-paper": {
//             width: isMobile ? "100%" : "40%",
//             maxWidth: "500px",
//             display: "flex",
//             height: isMobile ? "calc(100% - 48px)" : "100%",
//             marginTop: isMobile ? "48px" : "0px",
//             flexDirection: "column",
//             backgroundImage: "none !important",
//             backgroundColor: "rgba(0, 0, 0, 0.999)", // Dark cart menu
//             color: theme.palette.text.primary,
//             boxShadow: "-4px 0 10px rgba(0, 0, 0, 0.1)",
//             position: "fixed",
//             right: 0,
//             top: 0,
//             bottom: 0,
//           },
//         }}
//       >
//         <Box flex={1} p={2} display="flex" flexDirection="column">
//           {cart?.lines?.length > 0 ? <CartContents cart={cart} /> : <EmptyCart />}
//         </Box>
//       </Drawer>
//     </>
//   );
// }

// Code without backdrop but faster...
"use client";

import {
  Box,
  Drawer,
  useTheme
} from "@mui/material";

import CartContents from "components/cart/components/CartContents";
import CartHeader from "components/cart/components/CartHeader";
import EmptyCart from "components/cart/components/EmptyCart";
import useIsMobile from "components/hooks/useIsMobile";
import { usePathname, useSearchParams } from "next/navigation";

export default function CartMenu({ cartOpen, cart, toggleCart }: {
  toggleCart: () => void;
  cart: any;
  cartOpen: boolean;
  atTop: boolean;
}) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const theme = useTheme();

  // Close menu on route change
  // useEffect(() => {
  //   if (cartOpen) {
  //     setCartOpen(false);
  //   }
  // }, [pathname, searchParams]);

  return (
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
      <CartHeader toggleCart={toggleCart} />
      <Box flex={1} p={2} display="flex" flexDirection="column">
        {cart?.lines?.length > 0 ? <CartContents cart={cart} toggleCart={toggleCart}/> : <EmptyCart />}
      </Box>
    </Drawer>
  );
}

'use client';

import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import useIsMobile from 'components/hooks/useIsMobile';
import { useCart } from '../actions/cart-context';

export default function CartHeader({ toggleCart }: { toggleCart: () => void }) {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const { cart } = useCart();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={2}
      height={65}
      borderBottom={`1px solid ${theme.palette.divider}`}
    >
      <Typography variant="h6" fontWeight={500}>
        Cart ({cart?.totalQuantity || 0})
      </Typography>
      {!isMobile && (
        <IconButton onClick={toggleCart} aria-label="Close cart">
          <CloseIcon />
        </IconButton>
      )}
    </Box>
  );
}

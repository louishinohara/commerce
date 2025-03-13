import { ShoppingBagOutlined } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import { keyframes } from "@mui/system";

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 4px rgba(255, 200, 100, 0.5); }
  50% { box-shadow: 0 0 12px rgba(255, 200, 100, 0.8); }
  100% { box-shadow: 0 0 4px rgba(255, 200, 100, 0.5); }
`;

export default function CartIcon({
  className,
  quantity = 0,
  toggleCart,
}: {
  className?: string;
  quantity?: number;
  toggleCart: () => void;
}) {
  return (
    <IconButton onClick={toggleCart} size="small" className={className} aria-label="Open cart">
      <Badge
        badgeContent={quantity > 0 ? quantity : null}
        color="primary"
        overlap="circular"
        sx={{
          "& .MuiBadge-badge": {
            fontSize: "10px",
            minWidth: "16px",
            height: "16px",
            backgroundColor: "rgba(255, 200, 100, 0.9)", // Soft golden yellow
            color: "#fff",
            borderRadius: "50%",
            boxShadow: "0 0 4px rgba(255, 200, 100, 0.5)",
            animation: `${glowAnimation} 3s infinite alternate ease-in-out`,
          },
        }}
      >
        <ShoppingBagOutlined fontSize="small" />
      </Badge>
    </IconButton>
  );
}

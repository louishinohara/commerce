import { ShoppingBagOutlined } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";

export default function OpenCart({
  className,
  quantity = 0,
  onClick,
}: {
  className?: string;
  quantity?: number;
  onClick: () => void;
}) {
  return (
    <IconButton onClick={onClick} size="small" className={className} aria-label="Open cart">
      <Badge
        badgeContent={quantity > 0 ? quantity : null}
        color="primary"
        overlap="circular"
        sx={{ "& .MuiBadge-badge": { fontSize: "10px", minWidth: "16px", height: "16px" } }}
      >
        <ShoppingBagOutlined fontSize="small" />
      </Badge>
    </IconButton>
  );
}

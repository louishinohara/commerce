import { Button } from "@mui/material";
import { keyframes } from "@mui/system";
import LoadingDots from "components/loading-dots";
import Price from "components/price";
import { useFormStatus } from "react-dom";
import { redirectToCheckout } from "../actions/actions";
import CartItem from "./CartItem";

// Glow animation with visible intensity
const glowAnimation = keyframes`
  0% { box-shadow: 0 0 4px rgba(255, 200, 100, 0.4); }
  50% { box-shadow: 0 0 18px rgba(255, 200, 100, 0.9); }
  100% { box-shadow: 0 0 4px rgba(255, 200, 100, 0.4); }
`;

export default function CartContents({ cart, toggleCart }: { cart: any; toggleCart: () => void }) {
  const { pending } = useFormStatus();

  return (
    <div className="flex h-full flex-col justify-between overflow-hidden">
      {/* Cart Items */}
      <ul className="grow overflow-auto">
        {cart?.lines
          .sort((a, b) => a.merchandise.product.title.localeCompare(b.merchandise.product.title))
          .map((item, i) => (
            <CartItem toggleCart={toggleCart} key={i} item={item} />
          ))}
      </ul>

      {/* Cart Summary - Minimalist Styling */}
      <div className="mt-4 px-4">
        <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300">
          <p className="text-2xl font-medium">Total</p>
          <Price
            className="text-xl font-semibold text-black dark:text-white px-1"
            amount={cart.cost.totalAmount.amount}
            currencyCode={cart.cost.totalAmount.currencyCode}
          />
        </div>


        <form action={redirectToCheckout} className="mt-4">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={pending}
            sx={{
              fontSize: "1.1rem",
              fontWeight: 500,
              textTransform: "none",
              paddingY: "14px",
              borderRadius: "12px",
              backgroundColor: "#ffc864",
              color: "#121212",
              boxShadow: "0 0 6px rgba(255, 200, 100, 0.6)",
              animation: `${glowAnimation} 3s infinite alternate ease-in-out`,
              "&:hover": {
                backgroundColor: "#ffb347",
                boxShadow: "0 0 20px rgba(255, 200, 100, 1)",
              },
            }}
          >
            {pending ? <LoadingDots className="bg-white" /> : "Proceed to Checkout"}
          </Button>
        </form>
      </div>
    </div>
  );
}

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";
import messages from "../../../lib/data/cart/data.json";

export default function EmptyCart() {
  const randomMessage = useMemo(
    () => messages[Math.floor(Math.random() * messages.length)]?.text,
    []
  );

  return (
    <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
      <ShoppingCartIcon className="h-16 text-neutral-400" />
      <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
      <p className="mt-2 text-center text-sm text-neutral-500 whitespace-pre-line">
        {randomMessage}
      </p>
    </div>
  );
}

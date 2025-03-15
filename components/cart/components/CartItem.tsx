import Price from "components/price";
import { DEFAULT_OPTION } from "lib/constants";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { useCart } from "../actions/cart-context";
import { EditItemQuantityButton } from "./button/EditItemQuantityButton";

/**
 * A single cart line item that shows:
 * - Image on the left (clickable)
 * - Product title at top right (clickable), product type under that
 * - Price on the bottom-left, quantity counters on the bottom-right
 */
export default function CartItem({ item, toggleCart }: { item: any; toggleCart: () => void }) {
  const { updateCartItem } = useCart();

  /**
   * Optimistically update the cart quantity before making the actual request.
   * - Updates the cart state immediately for instant UI feedback.
   * - Then schedules another update for the real Shopify sync in the background.
   */
  const optimisticUpdate = useCallback(
    (merchandiseId: string, type: "plus" | "minus" | "delete") => {
      // Instant UI change
      updateCartItem(merchandiseId, type);

      // Background sync after a short delay
      setTimeout(() => {
        updateCartItem(merchandiseId, type);
      }, 10);
    },
    [updateCartItem]
  );

  // Build URL to product using selected options
  const merchandiseSearchParams: Record<string, string> = {};
  item.merchandise.selectedOptions.forEach(
    ({ name, value }: { name: string; value: string }) => {
      if (value !== DEFAULT_OPTION) {
        merchandiseSearchParams[name.toLowerCase()] = value;
      }
    }
  );

  const merchandiseUrl = createUrl(
    `/product/${item.merchandise.product.handle}`,
    new URLSearchParams(merchandiseSearchParams)
  );

  return (
    <li className="flex w-full items-start border-b border-neutral-300 dark:border-neutral-700 py-4 px-2 space-x-3">
      {/* Left: Clickable product image */}
      <div
        className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 cursor-pointer"
        onClick={toggleCart}
      >
        <Image
          className="h-full w-full object-cover"
          width={64}
          height={64}
          alt={item.merchandise.product.title}
          src={item.merchandise.product.featuredImage.url}
        />
      </div>

      {/* Right: Clickable product details */}
      <div className="flex flex-col flex-1">
        {/* Clickable Title */}
        <Link href={merchandiseUrl} onClick={toggleCart} className="hover:underline cursor-pointer">
          <p className="text-sm font-medium leading-tight">
            {item.merchandise.product.title}
          </p>
        </Link>
        
        {/* Type (variant) */}
        {item.merchandise.title !== DEFAULT_OPTION && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            {item.merchandise.title}
          </p>
        )}

        {/* Bottom row: price (left) and quantity (right) */}
        <div className="flex items-center justify-between mt-2">
          {/* Price on the left */}
          <Price
            amount={item.cost.totalAmount.amount}
            currencyCode={item.cost.totalAmount.currencyCode}
            className="text-sm font-medium"
          />

          {/* Quantity controls on the right */}
          <div className="flex items-center space-x-2">
            <EditItemQuantityButton
              item={item}
              type="minus"
              optimisticUpdate={optimisticUpdate}
            />
            <span className="text-sm font-medium w-5 text-center">
              {item.quantity}
            </span>
            <EditItemQuantityButton
              item={item}
              type="plus"
              optimisticUpdate={optimisticUpdate}
            />
          </div>
        </div>
      </div>
    </li>
  );
}

import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function EmptyCart() {
  return (
    <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
      <ShoppingCartIcon className="h-16" />
      <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
    </div>
  );
}

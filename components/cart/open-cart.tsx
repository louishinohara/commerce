import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-end text-black transition-colors dark:text-white">
      {/* Shopping Bag Icon (Aligned to the Right) */}
      <ShoppingBagIcon
        className={clsx('h-5 w-5 transition-all ease-in-out hover:scale-110', className)}
      />

      {/* Quantity Badge */}
      {quantity ? (
        <div className="absolute right-0 top-0 -mr-1 -mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}

import Price from 'components/price';
import { DEFAULT_OPTION } from 'lib/constants';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { DeleteItemButton } from '../delete-item-button';

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartItem({ item }: { item: any }) {
  const merchandiseSearchParams = {} as MerchandiseSearchParams;
  item.merchandise.selectedOptions.forEach(({ name, value }: { name: string; value: string }) => {
    if (value !== DEFAULT_OPTION) {
      merchandiseSearchParams[name.toLowerCase()] = value;
    }
  });

  const merchandiseUrl = createUrl(`/product/${item.merchandise.product.handle}`, new URLSearchParams(merchandiseSearchParams));

  return (
    <li className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700">
      <div className="relative flex w-full flex-row justify-between px-1 py-4">
        <div className="absolute z-40 -ml-1 -mt-2">
          <DeleteItemButton item={item} />
        </div>
        <div className="flex flex-row">
          <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
            <Image className="h-full w-full object-cover" width={64} height={64} alt={item.merchandise.product.title} src={item.merchandise.product.featuredImage.url} />
          </div>
          <Link href={merchandiseUrl} className="z-30 ml-2 flex flex-row space-x-4">
            <div className="flex flex-1 flex-col text-base">
              <span className="leading-tight">{item.merchandise.product.title}</span>
              {item.merchandise.title !== DEFAULT_OPTION && <p className="text-sm text-neutral-500 dark:text-neutral-400">{item.merchandise.title}</p>}
            </div>
          </Link>
        </div>
        <Price className="text-right text-sm" amount={item.cost.totalAmount.amount} currencyCode={item.cost.totalAmount.currencyCode} />
      </div>
    </li>
  );
}

'use client';

import { Dialog, Transition } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Price from 'components/price';
import { DEFAULT_OPTION } from 'lib/constants';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import { createCartAndSetCookie, redirectToCheckout } from './actions';
import { useCart } from './cart-context';
import CheckoutButton from './components/CheckoutButton';
import CloseCart from './components/CloseCart';
import { DeleteItemButton } from './delete-item-button';
import OpenCart from './open-cart';

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (cart?.totalQuantity && cart?.totalQuantity !== quantityRef.current && cart?.totalQuantity > 0) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      {/* ✅ FIX: Replace <button> with a <div> to avoid nesting issues */}
      <div onClick={openCart} aria-label="Open cart" className="cursor-pointer">
        <OpenCart quantity={cart?.totalQuantity} />
      </div>

      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Overlay />
          <SlideInPanel closeCart={closeCart} cart={cart} updateCartItem={updateCartItem} />
        </Dialog>
      </Transition>
    </>
  );
}

/**
 * ✅ Overlay (Dimmed Background)
 */
function Overlay() {
  return (
    <Transition.Child
      as={Fragment}
      enter="transition-all ease-in-out duration-300"
      enterFrom="opacity-0 backdrop-blur-none"
      enterTo="opacity-100 backdrop-blur-[.5px]"
      leave="transition-all ease-in-out duration-200"
      leaveFrom="opacity-100 backdrop-blur-[.5px]"
      leaveTo="opacity-0 backdrop-blur-none"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
    </Transition.Child>
  );
}

/**
 * ✅ Slide-In Cart Panel
 */
function SlideInPanel({ closeCart, cart, updateCartItem }: { closeCart: () => void; cart: any; updateCartItem: any }) {
  return (
    <Transition.Child
      as={Fragment}
      enter="transition-all ease-in-out duration-300"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transition-all ease-in-out duration-200"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px] dark:bg-black/80 dark:text-white">
        <CartHeader closeCart={closeCart} />
        {cart?.lines?.length > 0 ? <CartContents cart={cart} updateCartItem={updateCartItem} /> : <EmptyCart />}
      </Dialog.Panel>
    </Transition.Child>
  );
}

/**
 * ✅ Cart Header with Close Button
 */
function CartHeader({ closeCart }: { closeCart: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-lg font-semibold">My Cart</p>
      <button aria-label="Close cart" onClick={closeCart}>
        <CloseCart />
      </button>
    </div>
  );
}

/**
 * ✅ Empty Cart Message
 */
function EmptyCart() {
  return (
    <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
      <ShoppingCartIcon className="h-16" />
      <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
    </div>
  );
}

/**
 * ✅ Full Cart Contents
 */
function CartContents({ cart, updateCartItem }: { cart: any; updateCartItem: any }) {
  return (
    <div className="flex h-full flex-col justify-between overflow-hidden p-1">
      <ul className="grow overflow-auto py-4">
        {cart.lines
          .sort((a, b) => a.merchandise.product.title.localeCompare(b.merchandise.product.title))
          .map((item, i) => (
            <CartItem key={i} item={item} updateCartItem={updateCartItem} />
          ))}
      </ul>
      <CartSummary cart={cart} />
      <form action={redirectToCheckout}>
        <CheckoutButton />
      </form>
    </div>
  );
}

/**
 * ✅ Individual Cart Item
 */
function CartItem({ item, updateCartItem }: { item: any; updateCartItem: any }) {
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
          <DeleteItemButton item={item} optimisticUpdate={updateCartItem} />
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

/**
 * ✅ Cart Summary (Total, Taxes, Shipping)
 */
function CartSummary({ cart }: { cart: any }) {
  return (
    <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
      <p>Total</p>
      <Price className="text-right text-base text-black dark:text-white" amount={cart.cost.totalAmount.amount} currencyCode={cart.cost.totalAmount.currencyCode} />
    </div>
  );
}

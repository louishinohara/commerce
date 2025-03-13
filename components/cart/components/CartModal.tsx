'use client';

import CartMenu from 'components/layout/navbar/components/CartMenu';
import { useEffect, useRef } from 'react';
import { createCartAndSetCookie } from '../actions';
import { useCart } from '../cart-context';
import CartIcon from '../CartIcon';


export default function CartModal({ atTop, cartOpen, toggleCart }: {
  atTop: boolean;
  cartOpen: boolean;
  toggleCart: () => void;
}) {
  const { cart } = useCart();
  const quantityRef = useRef(cart?.totalQuantity);


  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (cart?.totalQuantity && cart?.totalQuantity !== quantityRef.current && cart?.totalQuantity > 0) {
      if (!cartOpen) {
        toggleCart();
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [cartOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <CartIcon quantity={cart?.totalQuantity} toggleCart={toggleCart} />
      <CartMenu
        cart={cart}
        atTop={atTop}
        cartOpen={cartOpen}
        toggleCart={toggleCart}
      />
    </>
  );
}

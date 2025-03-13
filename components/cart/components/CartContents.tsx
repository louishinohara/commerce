import { redirectToCheckout } from '../actions';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import CheckoutButton from './CheckoutButton';

export default function CartContents({ cart }: { cart: any }) {
  return (
    <div className="flex h-full flex-col justify-between overflow-hidden p-1">
      <ul className="grow overflow-auto py-4">
        {cart.lines
          .sort((a, b) => a.merchandise.product.title.localeCompare(b.merchandise.product.title))
          .map((item, i) => (
            <CartItem key={i} item={item} />
          ))}
      </ul>
      <CartSummary cart={cart} />
      <form action={redirectToCheckout}>
        <CheckoutButton />
      </form>
    </div>
  );
}

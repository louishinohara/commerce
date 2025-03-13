import Price from 'components/price';

export default function CartSummary({ cart }: { cart: any }) {
  return (
    <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
      <p>Total</p>
      <Price className="text-right text-base text-black dark:text-white" amount={cart.cost.totalAmount.amount} currencyCode={cart.cost.totalAmount.currencyCode} />
    </div>
  );
}

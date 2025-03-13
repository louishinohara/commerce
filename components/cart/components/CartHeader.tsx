import CloseCart from './CloseCart';

export default function CartHeader({ closeCart }: { closeCart: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-lg font-semibold">My Cart</p>
      <button aria-label="Close cart" onClick={closeCart}>
        <CloseCart />
      </button>
    </div>
  );
}

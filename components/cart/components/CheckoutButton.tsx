import LoadingDots from "components/loading-dots";
import { useFormStatus } from "react-dom";

export default function CheckoutButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
            type="submit"
            disabled={pending}
        >
            {pending ? <LoadingDots className="bg-white" /> : 'Proceed to Checkout'}
        </button>
    );
}
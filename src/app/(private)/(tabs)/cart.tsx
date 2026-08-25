import { CartView } from "@/viewModels/Cart/Cart.view";
import { useCartViewModel } from "@/viewModels/Cart/useCart.viewModel";

export default function Cart() {

    const viewModel = useCartViewModel()

    return (
        <CartView {...viewModel} />
    )
}
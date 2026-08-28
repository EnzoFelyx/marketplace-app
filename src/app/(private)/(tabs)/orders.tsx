import { OrderView } from "@/viewModels/Orders/Order.view";
import { useOrdersViewModel } from "@/viewModels/Orders/useOrder.viewModel";

export default function Order() {

    const viewModel = useOrdersViewModel()

    return (
        <OrderView {...viewModel} />
    )
}
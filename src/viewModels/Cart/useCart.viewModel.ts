import { useCartStore } from "@/shared/store/cart-store"

export const useCartViewModel = () => {

    const { products } = useCartStore()

    return {
        products
    }
}
import { useCartStore } from "@/shared/store/cart-store"

export const useCartCardViewModel = () => {

    const { updateQuantity } = useCartStore()

    const handleIncrement = (productId: number, quantity: number) => {
        updateQuantity({ productId, quantity: quantity + 1 })
    }

    const handleDecrement = (productId: number, quantity: number) => {
        updateQuantity({ productId, quantity: quantity - 1 })
    }

    return {
        handleDecrement,
        handleIncrement
    }
}
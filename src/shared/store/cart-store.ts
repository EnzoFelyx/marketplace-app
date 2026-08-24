import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cartService } from "../services/cart.service";

export interface CartProduct {
    id: number
    name: string
    price: string
    quantity: number
    image?: string
}

export type OmittedProductCart = Omit<CartProduct, "quantity">

interface Props {
    products: CartProduct[]
    total: number
    addItem: (product: OmittedProductCart) => void
    removeProduct: (productId: number) => void
    updateQuantity: (params: { product: number; quantity: number }) => void
    clearCart: () => void
    getItemCount: () => number
}

export const useCartStore = create<Props>()(
    persist((set, get) => ({
        products: [],
        total: 0,

        addItem: (newProduct) => set((state)=> {
            const newItems = cartService.addProductToCart(state.products, newProduct)
            return {
                products: newItems,
                total: 1,
            }
        }),
        clearCart: () => set({ products: [], total: 0 }),
        getItemCount: () => 0,
        removeProduct: () => set({}),
        updateQuantity: () => set({}),
    }), {
        name: "marketplace-cart",
        storage: createJSONStorage(() => AsyncStorage),
    })
)
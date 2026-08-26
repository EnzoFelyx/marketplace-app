import { PriceText } from "@/components/PriceText"
import { CartProduct } from "@/shared/store/cart-store"
import { resolveFileUrl } from "@/shared/utils/resolve-file-url"
import { FC } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { CartCardView } from "./CartCard.view"
import { useCartCardViewModel } from "./useCartCard.viewModel"

interface Props {
    product: CartProduct
}

export const CartCard: FC<Props> = ({ product }) => {

    const viewModel = useCartCardViewModel()

    return <CartCardView product={product} {...viewModel} />
}

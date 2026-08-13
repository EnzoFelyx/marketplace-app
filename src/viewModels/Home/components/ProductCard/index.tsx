import { ProductInterface } from "@/shared/interface/product"
import { FC } from "react"
import { Text, View } from "react-native"
import { ProductCardView } from "./ProductCard.view"
import { useProductCardViewModel } from "./useProductCard.viewModel"

interface Props {
    product: ProductInterface
}

export const ProductCard: FC<Props> = (props) => {

    const viewModel = useProductCardViewModel(props)

    return (
        <ProductCardView {...viewModel}/>
    )
}
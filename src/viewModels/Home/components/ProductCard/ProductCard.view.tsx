import { ProductInterface } from "@/shared/interface/product"
import { FC } from "react"
import { Text, View } from "react-native"
import { useProductCardViewModel } from "./useProductCard.viewModel"


export const ProductCardView: FC<ReturnType<typeof useProductCardViewModel>> = ({product}) => {
    return (
        <View>
            <Text>{product.name}</Text>
        </View>
    )
}
import { Button } from "@/components/Button"
import { PriceText } from "@/components/PriceText"
import { ProductInterface } from "@/shared/interface/product"
import { FC } from "react"
import { View } from "react-native"

interface Props {
    product: ProductInterface
    handleAddToCart: () => void
}

export const CartFooter: FC<Props> = ({ product, handleAddToCart }) => {
    return (
        <View className="fixed bg-white bottom-0 right-0 left-0 p-7 h-[126px] justify-between items-center flex-row">

            <PriceText value={Number(product.value)} />

            <Button
                leftIcon="cart"
                className=" w-[120px] h-[40px]"
                onPress={handleAddToCart}
            >
                Adicionar
            </Button>
        </View>
    )
}
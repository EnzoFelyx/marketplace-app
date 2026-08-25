import { PriceText } from "@/components/PriceText"
import { CartProduct } from "@/shared/store/cart-store"
import { resolveFileUrl } from "@/shared/utils/resolve-file-url"
import { FC } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"

interface Props {
    product: CartProduct
}

export const CartCard: FC<Props> = ({ product }) => {

    return (
        <View className="bg-white h-[71px] w-full flex-row items-center px-2 mb-2 rounded-lg">
            <Image
                source={{ uri: resolveFileUrl(product?.image) ?? '' }}
                className="w-16 h-16 rounded-md mr-4"
                resizeMode="cover"
            />

            <View className="flex-1 mr-3">
                <Text className="text-sm font-normal text-black mb-1">{product.name}</Text>
                <PriceText
                    classNameCurrency="text-sm font-bold"
                    classNameValue="text-sm font-bold"
                    value={Number(product.price)}
                />
            </View>

            <View className="flex-row items-center">
                <TouchableOpacity className="w-[18px] h-[18px] border-purple-base  border-2 rounded-md items-center justify-center">
                    <Text className="text-base font-medium text-purple-base text-center leading-none">-</Text>
                </TouchableOpacity>

                <View className="mx-2 items-center justify-center min-w-[24px] border-b border-b-gray-100">
                    <Text className="text-base font-medium text-black">{product.quantity}</Text>
                </View>

                <TouchableOpacity className="w-[18px] h-[18px] border-purple-base  border-2 rounded-md items-center justify-center">
                    <Text className="text-base font-medium text-purple-base text-center leading-none">+</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
} 
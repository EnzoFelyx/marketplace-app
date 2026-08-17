import { resolveFileUrl } from "@/shared/utils/resolve-file-url"
import { colors } from "@/styles/colors"
import { Ionicons } from "@expo/vector-icons"
import { FC } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { useProductCardViewModel } from "./useProductCard.viewModel"


export const ProductCardView: FC<ReturnType<typeof useProductCardViewModel>> = ({ product, displayName, formatRating }) => {

    const productPhoto = resolveFileUrl(product?.photo)

    return (
        <TouchableOpacity
            className="w-[48%] my-11 rounded-xl shadow-sm overflow-hidden p-[4px] bg-white mb-2"
        >
            <View>
                {productPhoto ? (
                    <Image
                        source={{ uri: productPhoto }}
                        className="w-full h-[96px] rounded-[6px]"
                        resizeMode="cover"
                        onError={({ nativeEvent }) =>
                            console.warn("Falha ao carregar imagem", productPhoto, nativeEvent.error)
                        }
                    />
                ) : null}
                <View className="absolute top-0 right-0 flex-row items-center px-2 py-1 rounded-b-lg rounded-r-none bg-white">
                    <Ionicons name="star" size={12} color={colors["blue-base"]} />
                    <Text className="text-sm font-semibold ml-1">{formatRating}</Text>
                </View>
            </View>
            <View className="px-2 pt-2 pb-1">
                <Text className="text-xs font-semibold mb-1" numberOfLines={2}>{displayName}</Text>
                <View className="flex-row items-center justify-between">
                    <Text>R${product.value}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
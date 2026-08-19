import { GetProductDetailsInterface } from "@/shared/interface/http/product-details"
import { resolveFileUrl } from "@/shared/utils/resolve-file-url"
import { colors } from "@/styles/colors"
import { Ionicons } from "@expo/vector-icons"
import { FC } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"

interface Props {
    productDetails: GetProductDetailsInterface
}

export const Header: FC<Props> = ({ productDetails }) => {

    const photo = resolveFileUrl(productDetails?.photo)

    return (
        <>
            <View className="pb-5 items-start">
                <TouchableOpacity className="w-full justify-start flex-row items-center gap-3">
                    <Ionicons name="arrow-back" size={24} color={colors['purple-base']} />
                    <Text className="text-base font-bold text-purple-base">Voltar</Text>
                </TouchableOpacity>
            </View>
            <View className="w-full rounded-lg shadow-xl shadow-gray-500/30 bg-white">
                {photo &&
                    <Image
                        source={{ uri: photo }}
                        className="w-full rounded-lg h-[192px]"
                    />
                }
                <View className="items-center absolute top-0 right-0 flex-row bg-blue-light px-2 py-1 rounded-bl-lg rounded-tr-lg">
                    <Ionicons name="star" size={16} color={colors['blue-base']} />
                    <Text className="text-sm font-semibold ml-1 text-gray-800">
                        {productDetails.averageRating.toFixed(1)}
                    </Text>
                    <Text className="text-[10px] font-semibold ml-1 text-gray-800">
                        / 5
                    </Text>
                </View>
            </View>
        </>
    )
}
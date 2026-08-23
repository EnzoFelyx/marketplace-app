import { PriceText } from "@/components/PriceText"
import { GetProductDetailsInterface } from "@/shared/interface/http/product-details"
import { resolveFileUrl } from "@/shared/utils/resolve-file-url"
import { colors } from "@/styles/colors"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
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
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-full justify-start flex-row items-center gap-3"
                >
                    <Ionicons name="arrow-back" size={24} color={colors['purple-base']} />
                    <Text className="text-base font-bold text-purple-base">Voltar</Text>
                </TouchableOpacity>
            </View>
            <View className="w-full rounded-lg shadow-gray-500/30 bg-white">
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

            <View className="bg-background py-[8px]">
                <View className="flex-row justify-between items-baseline mb-4">
                    <Text className="text-xl text-black font-bold max-w-[65%]">{productDetails.name}</Text>
                    <View>
                        <PriceText
                            classNameValue="text-xl font-bold text-black ml-1"
                            value={Number(productDetails.value)}
                        />
                    </View>
                </View>

                <View className="flex-row items-center bg-blue-light p-3 rounded-lg mb-4">
                    <View className="bg-blue-base w-[36px] h-[36px] rounded-[6px] items-center justify-center">
                        <Ionicons name="trending-up" color={colors.white} size={20} />
                    </View>

                    <Text className="text-sm text-gray-500 flex-1 ml-5">
                        <Text className="font-bold">{productDetails.views} pessoas </Text>
                        visualizaram esse produto nos últimos 7 dias
                    </Text>
                </View>

                <View className="mb-4">
                    <Text className="text-base leading-6 text-gray-500">{productDetails.description}</Text>
                </View>

                {(productDetails.width || productDetails.height) && (
                    <View className="mb-4">
                        {productDetails.width && (
                            <Text className="text-base text-gray-500 mb-1">
                                <Text className="text-black">Largura:</Text> {productDetails.width}
                            </Text>
                        )}

                        {productDetails.height && (
                            <Text className="text-base text-gray-500 mb-1">
                                <Text className="text-black">Altura:</Text> {productDetails.height}
                            </Text>
                        )}
                    </View>
                )}

                <View className="mb-6">
                    <Text className="text-base font-bold text-black">Categoria</Text>
                    <Text className="text-base text-gray-500">{productDetails.category.name}</Text>
                </View>

                <View className="flex-row justify-between items-center py-6 border-t border-gray-200">
                    <Text className="text-lg font-bold text-black">Avaliações</Text>

                    <TouchableOpacity>
                        <Text className="text-purple-base text-base font-medium">Avaliar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </>
    )
}
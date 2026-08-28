import { PriceText } from "@/components/PriceText"
import { OrderInterface } from "@/shared/interface/order"
import { resolveFileUrl } from "@/shared/utils/resolve-file-url"
import { format } from "date-fns"
import { FC } from "react"
import { Image, Text, View } from "react-native"

interface Props {
    order: OrderInterface
}

export const OrderItem: FC<Props> = ({ order }) => {

    return (
        <View className="flex-row items-center bg-white p-3 mb-3 rounded-lg">

            <Image
                source={{ uri: resolveFileUrl(order?.productPhoto) ?? "" }}
                className="w-[88px] h-[80px] rounded-lg mr-4"
                resizeMode="cover"
            />

            <View className="flex-1 justify-between">
                <View className="flex-row justify-between items-start mb-4 gap-2">
                    <Text
                        className="text-sm font-semibold text-black flex-1"
                        numberOfLines={1}>
                        {order.productName}
                    </Text>
                    <Text className="text-sm text-gray-500">{format(order.createdAt, "dd/MM/yy")}</Text>
                </View>
                <View className="flex-row items-center mb-1">
                    <Text
                        className="text-sm text-gray-500 mr-1"
                    >
                        {order.quantity} • {order.quantity > 1 ? 'Unidades' : 'Unidade'} •{' '}
                    </Text>

                    <PriceText
                        value={order.totalPrice}
                        classNameCurrency="text-sm text-gray-500"
                        classNameValue="text-sm text-gray-500"
                    />
                </View>
                <Text className="text-sm text-gray-500">Cartão final {order.creditCard.maskedNumber.slice(-4)}</Text>
            </View>
        </View>
    )
}
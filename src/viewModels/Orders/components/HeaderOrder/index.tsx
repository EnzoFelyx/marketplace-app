import { Text, View } from "react-native"

export const HeaderOrder = () => {

    return (
        <View className="gap-1 py-3 mb-4">
            <Text className="text-[20px] font-bold text-black">Pedidos</Text>
            <Text className="text-gray-400">Confira sua lista de produtos comprados</Text>
        </View>
    )
}
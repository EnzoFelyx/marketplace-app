import { Text, View } from "react-native"

export const CartHeader = () => {

    return (
        <View className="py-3 gap-1 mb-4">
            <Text className="text-[20px] font-bold text-black">Carrinho</Text>
            <Text className="text-gray-400">Veja seu carrinho de compras</Text>
        </View>
    )
}
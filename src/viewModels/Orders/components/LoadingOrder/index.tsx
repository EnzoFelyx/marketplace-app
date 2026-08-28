import { colors } from "@/styles/colors"
import { ActivityIndicator, Text, View } from "react-native"

export const LoadingOrder = () => {

    return (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size={"large"} color={colors["purple-base"]} />
            <Text className="text-gray-500 mt-4">
                Carregando pedidos...
            </Text>
        </View>
    )
}
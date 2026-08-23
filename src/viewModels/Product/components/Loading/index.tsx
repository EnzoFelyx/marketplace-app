import { colors } from "@/styles/colors"
import { ActivityIndicator, Text, View } from "react-native"

export const Loading = () => {
    return (
        <View className="flex-1 bg-background">
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator color={colors["purple-base"]} size={"large"} />
                <Text className="mt-4 text-base text-purple-base">Carregando produto...</Text>
            </View>
        </View>
    )
}
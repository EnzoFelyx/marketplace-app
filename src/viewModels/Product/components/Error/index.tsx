import { Button } from "@/components/Button"
import { colors } from "@/styles/colors"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { Text, View } from "react-native"

export const Error = () => {
    return (
        <View className="flex-1 justify-center items-center bg-background px-6">
            <Ionicons name="alert-circle" color={colors.danger.dark} size={40} />
            <Text className="text-lg text-center text-danger-dark mt-5">
                Ocorreu um erro ao buscar os detalhes do produto!
            </Text>

            <Button
                className="mt-6"
                onPress={router.back}>
                Volta
            </Button>
        </View>
    )
}
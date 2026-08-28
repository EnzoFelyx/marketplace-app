import { Button } from "@/components/Button"
import { colors } from "@/styles/colors"
import { Ionicons } from "@expo/vector-icons"
import { Text, View } from "react-native"

export const ErrorOrders = () => {

    return (
        <View className="flex-1 items-center justify-center px-6">
            <View style={{ backgroundColor: "#fca5a5" }} className="w-10 h-10 items-center justify-center rounded-full mb-6">
                <Ionicons name="alert" color={colors.danger} size={23} />
            </View>
            <View className="flex-row items-center justify-center">
                <Text className="text-xl text-danger font-bold">Falha ao carregar pedidos</Text>
            </View>
            <Button
                className="mt-6"
            >
                Voltar para produtos
            </Button>
        </View>
    )
}
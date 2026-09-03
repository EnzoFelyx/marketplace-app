import { Button } from "@/components/Button"
import { colors } from "@/styles/colors"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { Text, View } from "react-native"

export const EmptyOrder = () => {

    return (
        <View className="flex-1 items-center px-16 pt-16">
            <Ionicons name="clipboard-outline" size={60} color={colors.gray[200]} />
            <Text className="text-lg font-semibold text-black my-8 text-center">Você ainda não tem pedidos</Text>
            <Text className="text-base text-gray-400 mb-10 text-center">Explore o catálogo de produtos e faça sua primeira compra</Text>

            <Button
                /* leftIcon="storefront-outline" */
                variant="outline"
                onPress={() => router.push("/home")}
            >
                Explorar produtos
            </Button>
        </View>
    )
}
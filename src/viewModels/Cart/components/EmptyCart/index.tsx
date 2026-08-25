import { Button } from "@/components/Button"
import { colors } from "@/styles/colors"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export const EmptyCart = () => {

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 items-center px-16 pt-16">

                <Ionicons name="cart-outline" size={80} color={colors.gray[200]} />

                <Text className="text-xl font-bold text-black mt-4 mb-4">Seu carrinho está vazio</Text>

                <Text className="text-base text-gray-400 text-center mb-8">
                    Explore o catálago de produtos e faça a sua primeira compra!
                </Text>

            </View>
            <Button
                leftIcon="storefront-outline"
                variant="outline"
                className="w-[197px] self-center"
                onPress={() => router.push("/(private)/(tabs)/home")}
            >
                Explorar produtos
            </Button>
        </SafeAreaView>
    )
}
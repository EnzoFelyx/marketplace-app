import { Button } from "@/components/Button"
import { colors } from "@/styles/colors"
import { Ionicons } from "@expo/vector-icons"
import { FC } from "react"
import { Text, View } from "react-native"

interface Props {
    productName: string
    onGoToCart: () => void
    onClose: () => void
    onContinueShopping: () => void
}

export const CartSucessModal: FC<Props> = ({
    onClose,
    onContinueShopping,
    onGoToCart,
    productName
}) => {
    return (
        <View className="bg-white rounded-xl p-6 w-full max-w-sm">
            <View className="items-center mb-4">
                <View style={{ backgroundColor: "#dcfce7" }} className="w-16 h-16 rounded-full items-center justify-center mb-3 ">
                    <Ionicons name="checkmark" size={32} color={colors.success} />
                </View>

                <Text className="text-xl font-bold text-black text-center">Produto adicionado!</Text>
            </View>

            <Text className="text-gray-500 text-center mb-6">
                <Text className="font-semibold">{productName}</Text> foi adicionado ao carrinho com sucesso
            </Text>

            <View className="gap-3">
                <Button
                    onPress={onGoToCart}
                >
                    Ver Carrinho
                </Button>

                <Button
                    variant="outline"
                    onPress={onContinueShopping}
                >
                    Continuar comprando
                </Button>
            </View>
        </View>
    )
}
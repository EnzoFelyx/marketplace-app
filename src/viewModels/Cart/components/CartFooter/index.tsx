import { Button } from "@/components/Button"
import { PriceText } from "@/components/PriceText"
import { colors } from "@/styles/colors"
import { Ionicons } from "@expo/vector-icons"
import { Text, TouchableOpacity, View } from "react-native"

export const CartFooter = () => {

    return (
        <View className="bg-white p-4 rounded-lg mt-6">
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xs font-semibold text-gray-500">VALOR TOTAL</Text>
                <PriceText
                    value={190}
                    classNameValue="text-base text-black font-bold"
                    classNameCurrency="text-base text-black font-bold"
                />
            </View>

            <View className="mb-4">
                <View className="flex-row justify-between items-center mb-3">

                    <Text className="text-[10px] font-semibold text-gray-500">CARTÕES DE CRÉDITO</Text>

                    <TouchableOpacity className="flex-row items-center">
                        <Ionicons
                            name="card-outline"
                            size={20}
                            color={colors["purple-base"]}
                        />
                        <Text className="text-purple-base ml-2 text-sm font-bold">Adicionar cartão</Text>
                    </TouchableOpacity>
                </View>

                <Button className="mt-4">
                    Confirmar compra
                </Button>
            </View>
        </View>
    )
}
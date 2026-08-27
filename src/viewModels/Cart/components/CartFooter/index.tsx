import { Button } from "@/components/Button"
import { PriceText } from "@/components/PriceText"
import { CreditCard } from "@/shared/interface/credit.card"
import { useCartStore } from "@/shared/store/cart-store"
import { colors } from "@/styles/colors"
import { Ionicons } from "@expo/vector-icons"
import { FC } from "react"
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native"
import { CreditCardItem } from "../CreditCardItem"

interface Props {
    openCartBottomSheet: () => void
    creditCards: CreditCard[]
    loadingCreditCard: boolean
}

export const CartFooter: FC<Props> = ({ openCartBottomSheet, creditCards, loadingCreditCard }) => {

    const { total } = useCartStore()

    return (
        <View className="bg-white p-4 rounded-lg mt-6">
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xs font-semibold text-gray-500">VALOR TOTAL</Text>
                <PriceText
                    value={total}
                    classNameValue="text-base text-black font-bold"
                    classNameCurrency="text-base text-black font-bold"
                />
            </View>

            <View className="mb-4">
                <View className="flex-row justify-between items-center mb-3">

                    <Text className="text-[10px] font-semibold text-gray-500">CARTÕES DE CRÉDITO</Text>

                    <TouchableOpacity
                        className="flex-row items-center"
                        onPress={openCartBottomSheet}
                    >
                        <Ionicons
                            name="card-outline"
                            size={20}
                            color={colors["purple-base"]}
                        />
                        <Text className="text-purple-base ml-2 text-sm font-bold">Adicionar cartão</Text>
                    </TouchableOpacity>
                </View>

                {loadingCreditCard ? (
                    <View className="py-4 items-center">
                        <ActivityIndicator size={"small"} color={colors["purple-base"]} />
                        <Text className="text-gray-500 text-sm mt-2">Carregando cartões...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={creditCards}
                        renderItem={({ item }) => <CreditCardItem creditCard={item} />}
                        className="gap-2"
                    />
                )}

                <Button
                    className="mt-4"
                >
                    Confirmar compra
                </Button>

            </View>
        </View>
    )
}
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { colors } from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useCardBottomSheetViewModel } from "./useCardBottomSheet.viewModel";
import { InputController } from "@/components/InputController";
import { CreditCard } from "./components/CreditCard";

export const CardBottomSheetView: FC<ReturnType<typeof useCardBottomSheetViewModel>> = ({
    control,
    handleCreateCreditCard,
    expirationDateMask,
    cardNumberMask,
    closeBottomSheet,
    handleFieldBlur,
    handleFieldFocus,
    isFlipped,
    focusedField,
    CardData
}) => {

    return (
        <View>
            <View className="p-8">
                <View className="flex-row items-center justify-between mb-6">
                    <Text className="font-bold text-2xl text-center text-black">Adicionar cartão</Text>
                    <TouchableOpacity
                        className="w-8 items-center justify-center border border-gray-400 rounded-[10px]"
                        onPress={closeBottomSheet}
                    >
                        <Ionicons name="close" size={24} color={colors.gray[400]} />
                    </TouchableOpacity>
                </View>

                <CreditCard CardData={CardData} isFlipped={isFlipped} focusedField={focusedField}/>

                <View className="mt-6 gap-4">
                    <InputController
                        control={control}
                        name="titularName"
                        autoCapitalize="characters"
                        leftIcon="person-outline"
                        label="NOME DO TITULAR"
                        placeholder="NOME COMPLETO"
                        onFocus={() => handleFieldFocus("name")}
                        onBlur={handleFieldBlur}
                        inBottomSheet
                    />

                    <InputController
                        control={control}
                        name="number"
                        leftIcon="card-outline"
                        label="NÚMERO"
                        placeholder="Número do cartão"
                        mask={cardNumberMask}
                        keyboardType="numeric"
                        maxLength={19}
                        onFocus={() => handleFieldFocus("number")}
                        onBlur={handleFieldBlur}
                        inBottomSheet
                    />

                    <View className="flex-row gap-2">
                        <View className="flex-1">
                            <InputController
                                control={control}
                                name="expirationDate"
                                leftIcon="calendar-outline"
                                label="VENCIMENTO"
                                placeholder="MM/AA"
                                keyboardType="numeric"
                                maxLength={5}
                                onFocus={() => handleFieldFocus("expiry")}
                                onBlur={handleFieldBlur}
                                mask={expirationDateMask}
                                inBottomSheet
                            />
                        </View>
                        <View className="flex-1">
                            <InputController
                                control={control}
                                name="CVV"
                                leftIcon="lock-closed-outline"
                                label="CVV"
                                placeholder="000"
                                onFocus={() => handleFieldFocus("cvv")}
                                maxLength={3}
                                onBlur={handleFieldBlur}
                                keyboardType="numeric"
                                inBottomSheet
                            />
                        </View>
                    </View>
                </View>

                <View className="flex-row gap-4 pb-5 mt-8">
                    <View className="flex-1">
                        <Button
                            variant="outline"
                            onPress={closeBottomSheet}
                        >
                            Cancelar
                        </Button>
                    </View>

                    <View className="flex-1">
                        <Button onPress={handleCreateCreditCard}>
                            Adicionar
                        </Button>
                    </View>
                </View>

            </View>
        </View>
    )
}
import { FC } from "react";
import { useReview } from "./useReview.viewModel";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Stars } from "./component/Stars";

export const ReviewView: FC<ReturnType<typeof useReview>> = ({

}) => {

    return (
        <View className="bg-background rounded-t-2xl">
            <View className="flex-row items-center justify-between p-6">
                <Text className="text-lg font-bold text-black">Avaliar produto</Text>

                <TouchableOpacity className="w-8 h-8 items-center justify-center rounded-[10px] border border-gray-400">
                    <Ionicons name="close" size={24} color={colors.gray[400]} />
                </TouchableOpacity>
            </View>

            <View className="p-6">
                <Text className="font-semibold text-base text-gray-300">Nota</Text>

                <View className="flex-row items-center mb-6 gap-2">
                    <Stars rating={3} />
                </View>


                <Input
                    label="COMENTÁRIO"
                    placeholder="Descreva sua avaliação"
                    value=""
                    multiline
                    numberOfLines={8}
                    textAlign="left"
                    containerClassName="mb-8"
                    className="h-[150px]"
                />

                <View className="flex-row gap-3 mb-8">
                    <View className="flex-1">
                        <Button
                            variant="outline"
                        >
                            Cancelar
                        </Button>
                    </View>

                    <View className="flex-1">
                        <Button>
                            Enviar
                        </Button>
                    </View>
                </View>

            </View>

            <Text>Review do produto</Text>
        </View>
    )
}
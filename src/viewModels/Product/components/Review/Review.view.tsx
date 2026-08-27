import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { colors } from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Stars } from "./component/Stars";
import { useReview } from "./useReview.viewModel";

export const ReviewView: FC<ReturnType<typeof useReview>> = ({
    LoadingUserComment,
    handleContentChange,
    handleRatingChange,
    ratingForm,
    handleFormSubmit,
    isLoading,
    closeBottomSheet
}) => {

    return (
        <View className="bg-background rounded-t-2xl">
            <View className="flex-row items-center justify-between p-6">
                <Text className="text-lg font-bold text-black">
                    {ratingForm.isEditing ? "Editar avaliação" : "Avaliar produto"}
                </Text>

                <TouchableOpacity
                    className="w-8 h-8 items-center justify-center rounded-[10px] border border-gray-400"
                    onPress={closeBottomSheet}
                >
                    <Ionicons name="close" size={24} color={colors.gray[400]} />
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <View className="p-6 items-center justify-center min-h-[300px]">
                    <ActivityIndicator color={colors["purple-base"]} size={"large"} />
                    <Text className="text-gray-500 mt-4 text-center">Verificando avaliações existentes...</Text>
                </View>
            ) : (
                <View className="p-6">
                    <Text className="font-semibold text-base text-gray-300">Nota</Text>

                    <View className="flex-row items-center mb-6 gap-2">
                        <Stars handleRatingChange={handleRatingChange} rating={ratingForm.rating} />
                    </View>

                    <Input
                        label="COMENTÁRIO"
                        onChangeText={handleContentChange}
                        placeholder={ratingForm.isEditing ? "Edite sua avaliação" : "Descreva sua avaliação"}
                        value={ratingForm.content}
                        multiline
                        returnKeyType="done"
                        numberOfLines={8}
                        textAlign="left"
                        containerClassName="mb-8"
                        className="h-[150px]"
                        inBottomSheet
                    />

                    <View className="flex-row gap-3 mb-8">
                        <View className="flex-1">
                            <Button
                                variant="outline"
                                onPress={closeBottomSheet}
                            >
                                Cancelar
                            </Button>
                        </View>

                        <View className="flex-1">
                            <Button onPress={handleFormSubmit}>
                                {ratingForm.isEditing ? "Atualizar" : "Enviar"}
                            </Button>
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
}
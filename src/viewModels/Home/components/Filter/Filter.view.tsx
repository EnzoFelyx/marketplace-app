import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { colors } from "@/styles/colors"
import { Ionicons } from "@expo/vector-icons"
import Checkbox from "expo-checkbox"
import { FC } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { useFilterViewModel } from "./useFilter.viewModel"

export const FilterView: FC<ReturnType<typeof useFilterViewModel>> = ({
    productsCategory,
    isLoading,
    handleCategoryToggle,
    handleValueMaxChange,
    handleValueMinChange,
    selectedCategories,
    handleApplyFilters,
    handleResetFilter,
    closeModal
}) => {

    return (
        <View>
            <View className="flex-row items-center justify-between p-4 px-6">
                <Text className="text-lg font-bold text-black">Filtrar anúncios</Text>

                <TouchableOpacity onPress={closeModal}>
                    <Ionicons name="close" size={20} color={colors["purple-base"]} />
                </TouchableOpacity>
            </View>

            <View className="p-4 px-6">
                <Text className="font-semibold text-base text-gray-300">VALOR</Text>

                <View className="flex-row mb-4 w-[100%]">
                    <View className="flex-1">
                        <Input
                            onChangeText={(text) => handleValueMinChange(Number(text))}
                            placeholder="De"
                            keyboardType="numeric"
                            containerClassName="w-[90%]"
                        />
                    </View>

                    <View className="flex-1">
                        <Input
                            placeholder="De"
                            onChangeText={(text) => handleValueMaxChange(Number(text))}
                            keyboardType="numeric"
                            containerClassName="w-[90%]"
                        />
                    </View>
                </View>

                <Text className="font-semibold text-base text-gray-300">CATEGORIA</Text>

                {isLoading ? (
                    <Text>Carregando categorias...</Text>
                ) : (
                    <View className="mb-6 gap-3">
                        {
                            productsCategory?.map(({ name, id }) => (
                                <TouchableOpacity
                                    className="flex-row items-center py-2"
                                    onPress={() => handleCategoryToggle(id)}
                                    key={`product-category-${id}`}
                                >
                                    <Checkbox
                                        color={colors["purple-base"]}
                                        className="mr-3 rounded-full"
                                        onValueChange={() => handleCategoryToggle(id)}
                                        value={selectedCategories.includes(id)}
                                    />
                                    <Text className="text-base text-gray-400">{name}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                )}

                <View className="flex-row gap-3 mt-4 mb-6">

                    <View className="flex-1">
                        <Button variant="outline" onPress={handleResetFilter}>
                            Limpar filtro
                        </Button>
                    </View>

                    <View className="flex-1">
                        <Button onPress={handleApplyFilters} >
                            Filtrar
                        </Button>
                    </View>

                </View>

            </View>
        </View>
    )
}
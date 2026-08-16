import { Input } from "@/components/Input"
import { colors } from "@/styles/colors"
import { Ionicons } from "@expo/vector-icons"
import { FC } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { useFilterViewModel } from "./useFilter.viewModel"
import { Button } from "@/components/Button"

export const FilterView: FC<ReturnType<typeof useFilterViewModel>> = ({ }) => {
    return (
        <View>
            <View className="flex-row items-center justify-between p-4 px-6">
                <Text className="text-lg font-bold text-black">Filtrar anúncios</Text>

                <TouchableOpacity>
                    <Ionicons name="close" size={20} color={colors["purple-base"]} />
                </TouchableOpacity>
            </View>

            <View className="p-4 px-6">
                <Text className="font-semibold text-base text-gray-300">VALOR</Text>

                <View className="flex-row mb-4 w-[100%]">
                    <View className="flex-1">
                        <Input
                            placeholder="De"
                            keyboardType="numeric"
                            containerClassName="w-[90%]"
                        />
                    </View>

                    <View className="flex-1">
                        <Input
                            placeholder="De"
                            keyboardType="numeric"
                            containerClassName="w-[90%]"
                        />
                    </View>
                </View>

                <Text className="font-semibold text-base text-gray-300">CATEGORIA</Text>

                <View className="flex-row gap-3 mt-4 mb-6">

                    <View className="flex-1">
                        <Button variant="outline">
                            Limpar filtro
                        </Button>
                    </View>

                      <View className="flex-1">
                        <Button >
                            Buscar
                        </Button>
                    </View>

                </View>

            </View>
        </View>
    )
}
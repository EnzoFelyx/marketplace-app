import { Input } from "@/components/Input"
import { useBottomSheetStore } from "@/shared/store/bottomsheet-store"
import { colors } from "@/styles/colors"
import { Ionicons } from "@expo/vector-icons"

import { Text, TouchableOpacity, View } from "react-native"
import { Filter } from "../Filter"

export const SearchInput = () => {

    const { open } = useBottomSheetStore()

    return (
        <View className="mb-3 mt-6">
            <Text className="text-2xl font-bold mt-6">
                Explore Produtos
            </Text>
            <View className="flex-row">
                <View className="flex-1">
                    <Input
                        placeholder="Pesquisar"
                        leftIcon="search"
                        className="text-lg flex-1"
                        returnKeyType="search"
                    />
                </View>

                <TouchableOpacity
                    onPress={() => open({
                        content: <Filter />
                    })}
                    className="ml-5 mt-6 items-center justify-center rounded-xl border-[1px] h-[48px] w-[48px] border-purple-base"
                >
                    <Ionicons name="filter-outline" size={24} color={colors["purple-base"]} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
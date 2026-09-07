import { colors } from "@/styles/colors"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { FC } from "react"
import { Text, TouchableOpacity, View } from "react-native"

interface Props {
    handleLogout: () => void
}

export const HeaderProfile: FC<Props> = ({ handleLogout }) => {

    return (
        <View className="flex-row justify-between items-center py-3 border-shape">
            <TouchableOpacity
                className="flex-row items-center gap-1"
                onPress={router.back}
            >
                <Ionicons name="arrow-back" color={colors["purple-base"]} size={24} />
                <Text className="text-base text-purple-base">Voltar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="flex-row items-center gap-1"
                onPress={handleLogout}
            >
                <Ionicons name="log-out-outline" color={colors.danger.dark} size={20} />
                <Text className="text-danger-dark text-base">Sair</Text>
            </TouchableOpacity>
        </View>
    )
}
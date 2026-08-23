import { colors } from "@/styles/colors"
import { FC } from "react"
import { ActivityIndicator, Text, View } from "react-native"

interface Props {
    isLoadingComments: boolean
}

export const EmptyList: FC<Props> = ({ isLoadingComments }) => {

    if (isLoadingComments) {
        return (
            <View className="items-center py-8">
                <ActivityIndicator color={colors["purple-base"]} size={"small"} />
                <Text className="mt-2 text-gray-500">Carregando avaliações</Text>
            </View>
        )
    }

    return (
        <View className="py-8 items-center">
            <Text className="text-gray-500 text-base">Ainda não existem avaliações para esse produto</Text>
            <Text className="text-gray-400 text-sm mt-1">Seja o primeiro a avaliar</Text>
        </View>
    )
}
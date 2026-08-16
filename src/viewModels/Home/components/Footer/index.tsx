import { colors } from "@/styles/colors"
import { FC } from "react"
import { ActivityIndicator, View } from "react-native"

interface Props {
    isLoading: boolean
}

export const Footer: FC<Props> = ({ isLoading }) => {

    if (!isLoading) {
        return null
    }
    return (
        <View>
            <ActivityIndicator size={"small"} color={colors["purple-base"]} />
        </View>
    )
}
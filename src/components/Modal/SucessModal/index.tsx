import { Button } from "@/components/Button"
import { colors } from "@/styles/colors"
import { Ionicons } from "@expo/vector-icons"
import { FC } from "react"
import { Text, View } from "react-native"

export interface SucessModalParams {
    title: string,
    message?: string,
    buttonText?: string,
    onButtonPress?: () => void
}

export const SucessModal: FC<SucessModalParams> = ({
    title,
    buttonText = "Fechar",
    message,
    onButtonPress,
}) => {

    return (
        <View className="bg-white rounded-2xl p-6 w-[85%] max-w-sm mx-auto">
            <View className="items-center">
                <View style={{ backgroundColor: "#dcfce7" }} className="mb-4 w-16 h-16 rounded-full items-center justify-center">
                    <Ionicons name="checkmark-circle" color={colors.success} size={40} />
                </View>

                <Text className="text-xl font-bold text-black text-center mb-3">{title}</Text>
                <Text className="text-base text-gray-500 text-center mb-6 leading-6">{message}</Text>

                <Button
                    onPress={onButtonPress}
                >
                    {buttonText}
                </Button>
            </View>
        </View>
    )
}
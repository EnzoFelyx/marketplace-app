import { SelectionOptions } from "@/shared/hooks/useModal"
import { Ionicons } from "@expo/vector-icons"
import { FC } from "react"
import { Text, TouchableOpacity, View } from "react-native"

export interface SelectionModalProps {
    title: string
    message?: string
    options: SelectionOptions[]
}

export const SelectionModal: FC<SelectionModalProps> = ({
    title,
    message,
    options
}) => {
    return (
        <View className="bg-white rounded-xl shadow-2xl w-[85%] mx-auto max-w-sm">

            <Text>{title}</Text>

            {message && <Text>{message}</Text>}

            <View>
                {
                    options.map((option) => (
                        <TouchableOpacity
                            key={option.text}
                            onPress={option.onPress}
                            className="w-full py-3 px-4 rounded-lg items-center flex-row justify-center mb-2"
                        >
                            {option.icon && <Ionicons name={option.icon} size={20} />}
                            <Text>{option.text}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    )
}
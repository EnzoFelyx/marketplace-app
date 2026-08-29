import { SelectionOptions, SelectionVariant } from "@/shared/hooks/useModal"
import { colors } from "@/styles/colors"
import { Ionicons } from "@expo/vector-icons"
import clsx from "clsx"
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

    const getButtonClass = (variant: SelectionVariant) => clsx("w-full py-3 px-4 rounded-lg items-center flex-row justify-center mb-2", {
        "bg-danger": variant === "danger",
        "bg-blue-dark": variant === "secondary",
        "bg-purple-base": variant === "primary"
    })

    return (
        <View className="bg-white rounded-xl shadow-2xl w-[85%] mx-auto max-w-sm p-6">
            <View className="items-center">
                <Text className="text-lg font-bold text-black mb-3">{title}</Text>

                {message && <Text className="text-base text-gray-500 mb-6 leading-6 text-center">{message}</Text>}
            </View>

            <View className="gap-3">
                {
                    options.map((option, index) => (
                        <TouchableOpacity
                            key={`seletec-item-${index}`}
                            onPress={option.onPress}
                            className={getButtonClass(option.variant ?? "primary")}
                        >
                            {option.icon && <Ionicons name={option.icon} size={20} color={colors.white} className="mr-2" />}
                            <Text className="font-bold text-white">{option.text}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    )
}
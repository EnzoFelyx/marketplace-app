import { Ionicons } from "@expo/vector-icons"
import { FC } from "react"
import { Pressable, Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native"
import { inputVariants, InputVariantsProps } from "./input.variants"
import { useInputViewModel } from "./useInputViewModel"

export interface InputProps extends TextInputProps, InputVariantsProps {
    label?: string
    leftIcon?: keyof typeof Ionicons.glyphMap
    rightIcon?: keyof typeof Ionicons.glyphMap
    containerClassName?: string
    mask?: (value: string) => void | string
    error?: string
}

export const Input: FC<InputProps> = ({
    label,
    leftIcon,
    rightIcon,
    containerClassName,
    className,
    value,
    isError,
    secureTextEntry = false,
    onBlur,
    onFocus,
    onChangeText,
    mask,
    isDisable,
    error,
    ...textInputProps
}) => {

    const {
        getIconColor,
        handleBlur,
        handleFocus,
        handlePasswordToggle,
        handleWrapperPress,
        showPassword
    } = useInputViewModel({
        error,
        onBlur,
        onFocus,
        isError: !!error,
        mask,
        onChangeText,
        isDisable,
        secureTextEntry,
        value
    })

    const styles = inputVariants({

    })

    return (
        <View className={styles.container({ className: containerClassName })}>
            <Text className={styles.label()}>Label</Text>
            <Pressable className={styles.wrapper()}>
                <Ionicons name="person" size={22} />
                <TextInput className={styles.input({ className })} {...textInputProps} />
                <TouchableOpacity>
                    <Ionicons name="eye-off-outline" size={22} />
                </TouchableOpacity>
            </Pressable>
        </View>
    )
}
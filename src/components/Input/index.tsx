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
        showPassword,
        handleTextChange,
        isFocused,
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
        isFocused,

    })

    return (
        <View className={styles.container({ className: containerClassName })}>
            <Text className={styles.label()}>{label}</Text>
            <Pressable className={styles.wrapper()}>

                {leftIcon &&
                    <Ionicons
                        className="mr-3"
                        name={leftIcon}
                        size={22}
                        color={getIconColor()}
                    />
                }

                <TextInput
                    onChangeText={handleTextChange}
                    value={value}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    className={styles.input({ className })} {...textInputProps}
                />
                {rightIcon &&
                    <TouchableOpacity>
                        <Ionicons name={rightIcon} size={22} />
                    </TouchableOpacity>
                }
            </Pressable>
        </View>
    )
}
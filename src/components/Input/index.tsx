import { Ionicons } from "@expo/vector-icons"
import { BottomSheetTextInput } from "@gorhom/bottom-sheet"
import { cssInterop } from "nativewind"
import { FC } from "react"
import { Pressable, Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native"
import { inputVariants, InputVariantsProps } from "./input.variants"
import { useInputViewModel } from "./useInputViewModel"

const StyledBottomSheetTextInput = cssInterop(BottomSheetTextInput, { className: "style" })

export interface InputProps extends TextInputProps, InputVariantsProps {
    label?: string
    leftIcon?: keyof typeof Ionicons.glyphMap
    rightIcon?: keyof typeof Ionicons.glyphMap
    containerClassName?: string
    mask?: (value: string) => void | string
    error?: string
    inBottomSheet?: boolean
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
    inBottomSheet = false,
    ...textInputProps
}) => {

    const FieldComponent = inBottomSheet ? StyledBottomSheetTextInput : TextInput

    const {
        inputRef,
        getIconColor,
        handleBlur,
        handleFocus,
        handlePasswordToggle,
        handleWrapperPress,
        showPassword,
        handleTextChange,
        isFocused,
    } = useInputViewModel({
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
        isDisable,
        isError: !!error,
    })

    return (
        <View className={styles.container({ className: containerClassName })}>
            <Text className={styles.label()}>{label}</Text>
            <Pressable className={styles.wrapper()} onPress={handleWrapperPress}>

                {leftIcon &&
                    <Ionicons
                        className="mr-3"
                        name={leftIcon}
                        size={22}
                        color={getIconColor()}
                    />
                }

                <FieldComponent
                    ref={inputRef as React.Ref<any>}
                    onChangeText={handleTextChange}
                    value={value}
                    onBlur={handleBlur}
                    secureTextEntry={showPassword}
                    onFocus={handleFocus}
                    className={styles.input({ className })} {...textInputProps}
                />
                {secureTextEntry &&
                    <TouchableOpacity activeOpacity={0.7} onPress={handlePasswordToggle}>
                        <Ionicons
                            name={!showPassword ? "eye-off-outline" : "eye-outline"}
                            size={22}
                            color={getIconColor()}
                        />
                    </TouchableOpacity>
                }
                {rightIcon &&
                    <TouchableOpacity>
                        <Ionicons name={rightIcon} size={22} color={getIconColor()} />
                    </TouchableOpacity>
                }
            </Pressable>
            {
                error &&
                <Text className={styles.error()}>
                    <Ionicons name="alert-circle-outline" className="ml-2" /> {error}
                </Text>
            }
        </View>
    )
}
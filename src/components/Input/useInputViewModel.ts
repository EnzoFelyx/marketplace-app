import { colors } from "@/styles/colors"
import { useRef, useState } from "react"
import { BlurEvent, FocusEvent, TextInput } from "react-native"

interface Props {
    isError?: boolean
    isDisable?: boolean
    error?: string
    secureTextEntry?: boolean
    onFocus?: (e: FocusEvent) => void
    onBlur?: (e: BlurEvent) => void
    mask?: (text: string) => string | void
    onChangeText?: (text: string) => string | void
    value?: string
}

export const useInputViewModel = ({
    error,
    isError,
    isDisable,
    mask,
    onBlur,
    onChangeText,
    onFocus,
    secureTextEntry,
    value
}: Props) => {

    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const inputRef = useRef<TextInput>(null)

    const handlePasswordToggle = () => {
        setShowPassword((prev) => !prev)
    }

    const handleWrapperPress = () => {
        inputRef.current?.focus()
    }

    const handleFocus = (e: FocusEvent) => {
        setIsFocused(true)
        onFocus?.(e)
    }

    const handleBlur = (e: BlurEvent) => {
        setIsFocused(false)
        onBlur?.(e)
    }

    const getIconColor = () => {
        if (isFocused) return colors["purple-base"]
        if (isError) return colors["danger"]
        if (value) return colors["purple-base"]
        return colors.gray[200]
    }

    return {
        handleBlur,
        handleFocus,
        getIconColor,
        handlePasswordToggle,
        handleWrapperPress,
        showPassword
    }
}
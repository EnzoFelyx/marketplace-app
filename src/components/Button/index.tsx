import { colors } from "@/styles/colors"
import { Ionicons } from "@expo/vector-icons"
import { FC } from "react"
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { buttonVariants, ButtonVariantsProps } from "./button.variants"

interface Props extends TouchableOpacityProps, ButtonVariantsProps {
    leftIcon?: keyof typeof Ionicons.glyphMap
    rightIcon?: keyof typeof Ionicons.glyphMap
    children: string
}

export const Button: FC<Props> = ({
    leftIcon,
    rightIcon,
    children,
    isDisabled,
    isLoading,
    hasIcon,
    variant= "filled",
    ...rest }) => {

    const styles = buttonVariants({
        hasIcon: !!leftIcon || !!rightIcon,
        isDisabled,
        isLoading,
        variant
    })

    const contentColor = variant === "filled" ? colors.white : colors["purple-base"]

    const renderContent = () => {
        if (isLoading) {
            return <ActivityIndicator size="small" color={contentColor} />
        }
        return (
            <>
                {
                    leftIcon && <Ionicons name={leftIcon} color={contentColor} />
                }
                <Text className={styles.text()}>{children}</Text>
                {
                    rightIcon && <Ionicons name={rightIcon} color={contentColor} size={20} />
                }
            </>
        )
    }

    return (
        <TouchableOpacity className={styles.base()} {...rest}>
            {renderContent()}
        </TouchableOpacity>
    )
}
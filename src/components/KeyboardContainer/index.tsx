import { FC } from "react"
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface Props {
    children: React.ReactNode
    keyboardOffset?: number
}

export const KeyboardContainer: FC<Props> = ({ children, keyboardOffset = 20 }) => {
    return (
        <SafeAreaView className="flex-1">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={keyboardOffset}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    <View className="grow">
                        {children}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
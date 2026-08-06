import { Image, Text, View } from "react-native"

interface Props {
    title: string
    subtitle: string
}

export const AuthFormHeader = ({ title, subtitle }: Props) => {
    return (
        <View className="items-center mb-8">
            <Image
                source={require('@/assets/images/Logo.png')}
                resizeMode="contain"
                className="w-[80x] h-[60px] mb-8"
            />

            <Text className="text-3xl font-bold mb-3 text-gray-500">{title}</Text>
            <Text className="text-base text-gray-300">{subtitle}</Text>
        </View>
    )
}
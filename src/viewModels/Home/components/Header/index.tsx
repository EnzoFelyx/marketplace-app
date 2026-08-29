import { useUserStore } from "@/shared/store/user-store"
import { resolveFileUrl } from "@/shared/utils/resolve-file-url"
import { colors } from "@/styles/colors"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { Image, Text, TouchableOpacity, View } from "react-native"

export const HomeHeader = () => {

    const { user } = useUserStore() //sem necessidade de criar um homeViewModel

    const avatarUrl = resolveFileUrl(user?.avatarUrl)

    return (
        <View>
            <TouchableOpacity 
            onPress={() => router.push("/profile")}
            className="flex-row items-center gap-6"
            >
                <View className="relative">
                    {avatarUrl ? (
                        <Image
                            source={{ uri: avatarUrl }}
                            className="w-[56px] h-[56px] rounded-[12px] border-shape"
                        />
                    ) : (
                        <View
                            className="w-[56px] h-[56px] rounded-[12px] items-center justify-center border-2 bg-shape border-gray-200 "
                        >
                            <Ionicons name="person" size={24} color={colors.gray[300]} />
                        </View>
                    )}
                </View>

                <View>
                    <Text className="font-bold text-base">
                        Olá, {user?.name?.split(" ")[0] || "Usuário"}
                    </Text>

                    <View className="flex-row items-center gap-2">
                        <Text className="color-purple-base font-bold text-sm">Ver perfil</Text>
                        <Ionicons name="arrow-forward-outline" color={colors["purple-base"]} size={20} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}
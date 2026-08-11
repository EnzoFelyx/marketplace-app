import { useUserStore } from "@/shared/store/user-store";
import { Text, TouchableOpacity, View } from "react-native";

export default function Home() {

    const { logout } = useUserStore()

    return (
        <View className="flex-1 justify-center items-center gap-10">
            <Text>Home</Text>

            <TouchableOpacity onPress={logout}>
                <Text>deslogar</Text>
            </TouchableOpacity>
        </View>
    )
}
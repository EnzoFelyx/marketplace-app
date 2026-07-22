import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function App() {
    return (
        <View className="flex-1 justify-center items-center">
            <Text>meus aplicativo!</Text>

            <TouchableOpacity onPress={()=> router.push("login")}>
                <Text>Ir para login</Text>
            </TouchableOpacity>
        </View>
    )
}
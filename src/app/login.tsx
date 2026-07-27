import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Login() {
    return (
        <View className="flex-1 justify-center items-center gap-10">
            <Text>Login</Text>
            <TouchableOpacity onPress={()=> router.push("/register")}>
                <Text>Registrar</Text>
            </TouchableOpacity>
        </View>
    )  
}
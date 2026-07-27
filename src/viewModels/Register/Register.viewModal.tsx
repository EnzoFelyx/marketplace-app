import { Text, View } from "react-native";
import { useRegisterViewModal } from "./useRegister.view";

export const RegisterView: React.FC<ReturnType<typeof useRegisterViewModal>> = ({ useData, setUserData }) => {

    return (
        <View className="flex-1 justify-center items-center">
            <Text>{useData.name}</Text>
        </View>
    )
}
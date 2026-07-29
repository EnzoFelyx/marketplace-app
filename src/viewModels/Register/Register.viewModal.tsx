import { Text, TouchableOpacity, View } from "react-native";
import { useRegisterViewModal } from "./useRegister.view";

export const RegisterView: React.FC<ReturnType<typeof useRegisterViewModal>> = ({ onSubmit }) => {

    return (
        <View className="flex-1 justify-center items-center">
            <Text>Pagina de resgistro</Text>
            
            <TouchableOpacity onPress={onSubmit}>
                <Text>Registrar</Text>
            </TouchableOpacity>
        </View>
    )
}
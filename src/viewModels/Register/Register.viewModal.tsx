import { Text, TouchableOpacity, View } from "react-native";
import { useRegisterViewModal } from "./useRegister.view";
import { Input } from "@/components/Input";

export const RegisterView: React.FC<ReturnType<typeof useRegisterViewModal>> = ({ onSubmit }) => {

    return (
        <View className="flex-1 justify-center gap-4">
            <Text>Pagina de resgistro</Text>

            <Input />

            <TouchableOpacity onPress={onSubmit}>
                <Text>Registrar</Text>
            </TouchableOpacity>
        </View>
    )
}
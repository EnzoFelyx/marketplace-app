import { InputController } from "@/components/InputController";
import { Text, TouchableOpacity, View } from "react-native";
import { useRegisterViewModal } from "./useRegister.viewModel";

export const RegisterView: React.FC<ReturnType<typeof useRegisterViewModal>> = ({ onSubmit, control }) => {

    return (
        <View className="flex-1 justify-center gap-4">
            <Text>Pagina de resgistro</Text>

            <InputController
                control={control}
                name="email"
                label="E-MAIL"
                leftIcon="mail-outline"
                placeholder="mail@exemplo.br"
            />

            <TouchableOpacity onPress={onSubmit}>
                <Text>Registrar</Text>
            </TouchableOpacity>
        </View>
    )
}
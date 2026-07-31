import { Input } from "@/components/Input";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRegisterViewModal } from "./useRegister.view";

export const RegisterView: React.FC<ReturnType<typeof useRegisterViewModal>> = ({ onSubmit }) => {

    const [email, setEmail] = useState("")
    const [senha, setsenha] = useState("")

    console.log(email, senha)

    return (
        <View className="flex-1 justify-center gap-4">
            <Text>Pagina de resgistro</Text>

            <Input leftIcon="mail-outline" label="E-mail" value={email} onChangeText={setEmail} />
            <Input leftIcon="lock-closed-outline" label="Senha" value={senha} onChangeText={setsenha} />

            <TouchableOpacity onPress={onSubmit}>
                <Text>Registrar</Text>
            </TouchableOpacity>
        </View>
    )
}
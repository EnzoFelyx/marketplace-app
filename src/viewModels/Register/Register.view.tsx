import { AuthFormHeader } from "@/components/AuthFormHeader";
import { InputController } from "@/components/InputController";
import { KeyboardContainer } from "@/components/KeyboardContainer";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRegisterViewModal } from "./useRegister.viewModel";

export const RegisterView: React.FC<ReturnType<typeof useRegisterViewModal>> = ({ onSubmit, control }) => {

    return (
        <KeyboardContainer>
            <ScrollView className="flex-1 px-[40px]">
                <AuthFormHeader
                    title="Crie sua conta"
                    subtitle="Informe seus dados pessoais e de acesso"
                />

                <InputController
                    control={control}
                    name="name"
                    label="NOME"
                    leftIcon="person-outline"
                    placeholder="Seu nome completo"
                />

                <InputController
                    control={control}
                    name="phone"
                    label="TELEFONE"
                    leftIcon="call-outline"
                    placeholder="(00) 00000-0000"
                />

                <Text className="text-base mt-6 font-bold text-gray-500">Acesso</Text>

                <InputController
                    control={control}
                    name="email"
                    label="E-MAIL"
                    leftIcon="mail-outline"
                    placeholder="mail@exemplo.br"
                />

                <InputController
                    control={control}
                    name="password"
                    label="SENHA"
                    leftIcon="lock-closed-outline"
                    secureTextEntry
                    placeholder="Sua senha"
                />

                 <InputController
                    control={control}
                    name="confirmPassword"
                    label="CONFIRMAR SENHA"
                    leftIcon="lock-closed-outline"
                    secureTextEntry
                    placeholder="Confirme a senha"
                />

                <TouchableOpacity onPress={onSubmit}>
                    <Text>Registrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/login")}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardContainer>
    )
}
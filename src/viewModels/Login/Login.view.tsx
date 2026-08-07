import { AuthFormHeader } from "@/components/AuthFormHeader"
import { InputController } from "@/components/InputController"
import { KeyboardContainer } from "@/components/KeyboardContainer"
import { router } from "expo-router"
import { FC } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { useLoginViewModel } from "./useLogin.viewModel"

export const LoginView: FC<ReturnType<typeof useLoginViewModel>> = ({ control, onSubmit }) => {
    return (
        <KeyboardContainer>
            <View className="flex-1 justify-center items-center px-[40px]">

                <AuthFormHeader
                    title="Acesse sua conta"
                    subtitle="Informe seu e-mail e senha para entrar"
                />

                <InputController
                    control={control}
                    name="email"
                    label="E-MAIL"
                    leftIcon="mail-outline"
                    autoCapitalize="none"
                    keyboardType="email-address"
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

                <TouchableOpacity onPress={onSubmit}>
                    <Text>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/register")}>
                    <Text>Registro</Text>
                </TouchableOpacity>

            </View>
        </KeyboardContainer>
    )
}
import { AuthFormHeader } from "@/components/AuthFormHeader"
import { Button } from "@/components/Button"
import { InputController } from "@/components/InputController"
import { KeyboardContainer } from "@/components/KeyboardContainer"
import { router } from "expo-router"
import { FC } from "react"
import { Text, View } from "react-native"
import { useLoginViewModel } from "./useLogin.viewModel"

export const LoginView: FC<ReturnType<typeof useLoginViewModel>> = ({ control, onSubmit }) => {
    return (
        <KeyboardContainer>
            <View className="grow justify-center items-center px-[40px]">

                <View className="grow w-full items-center justify-center">

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

                    <Button className="mt-6" onPress={onSubmit} rightIcon="arrow-forward">
                        Login
                    </Button>

                </View>

                <View className="w-full mt-12 pb-16">
                    <Text className="text-base mb-6 text-gray-300">Ainda não tem uma conta?</Text>
                    <Button variant="outline" onPress={() => router.push("/(public)/register")} rightIcon="arrow-forward">
                        Cadastrar
                    </Button>
                </View>
            </View>
        </KeyboardContainer>
    )
}
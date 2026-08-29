import { AuthFormHeader } from "@/components/AuthFormHeader";
import { Button } from "@/components/Button";
import { InputController } from "@/components/InputController";
import { KeyboardContainer } from "@/components/KeyboardContainer";
import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useProfileViewModel } from "./useProfile.viewModel";
import { resolveFileUrl } from "@/shared/utils/resolve-file-url";
import { HeaderProfile } from "./components/HeaderProfile";

export const ProfileView: React.FC<ReturnType<typeof useProfileViewModel>> = ({
    avatarURI,
    control,
    onSubmit,
    isSubmitting,
    handleLogout
}) => {

    return (
        <KeyboardContainer>
            <ScrollView className="flex-1 px-[40px]">
                <HeaderProfile handleLogout={handleLogout} />
                <TouchableOpacity
                    className="w-[120px] h-[120px] rounded-[12px] justify-center items-center bg-shape self-center mb-8 mt-6"

                >
                    {avatarURI ? (
                        <Image source={{ uri: resolveFileUrl(avatarURI) ?? "" }} className="w-full h-full rounded-[12px]" resizeMode="cover" />
                    ) : (
                        <Ionicons name="cloud-upload-outline" size={32} />
                    )
                    }
                </TouchableOpacity>

                <Text className="text-base mt-6 font-bold text-gray-500">Acesso</Text>

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
                    label="SENHA ATUAL"
                    leftIcon="lock-closed-outline"
                    secureTextEntry
                    placeholder="Sua senha"
                />

                <InputController
                    control={control}
                    name="newPassword"
                    label="NOVA SENHA"
                    leftIcon="lock-closed-outline"
                    secureTextEntry
                    placeholder="Sua sova senha"
                />

                <Button className="mt-6" onPress={onSubmit} isLoading={isSubmitting}>
                    Atualizar cadastro
                </Button>
            </ScrollView>
        </KeyboardContainer>
    )
}
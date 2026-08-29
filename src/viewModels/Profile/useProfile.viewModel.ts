import { useModal } from "@/shared/hooks/useModal"
import { useUpdateProfileMutation } from "@/shared/queries/profile/use-update.profile.mutation"
import { useUserStore } from "@/shared/store/user-store"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { ProfileFormData, profileScheme } from "./profile.scheme"
import { useModalStore } from "@/shared/store/modal-store"
import { useCartStore } from "@/shared/store/cart-store"
import { useImage } from "@/shared/hooks/useImage"
import { CameraType } from "expo-image-picker"
import { useUploadAvatarMutation } from "@/shared/queries/auth/use-upload-avatar.mutation"

export const useProfileViewModel = () => {

    const { user, logout } = useUserStore()

    const updateProfileData = useUpdateProfileMutation()

    const [avatarURI, setAvatarURI] = useState<string | null>(user?.avatarUrl ?? null)

    const { clearCart } = useCartStore()

    const uploadAvatarMutation = useUploadAvatarMutation()

    const { handleSelectImage } = useImage({
        callBack: async (URI) => {
            if (URI) {
                const { url: responseUrl } = await uploadAvatarMutation.mutateAsync(URI)
                setAvatarURI(responseUrl)
            }
        },
        cameraType: CameraType.front
    })

    const { showSelection } = useModal()

    const { closeModal } = useModalStore()

    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
        resolver: yupResolver(profileScheme),
        defaultValues: {
            name: user?.name ?? "",
            email: user?.email ?? "",
            phone: user?.phone ?? "",
            newPassword: undefined,
            password: undefined
        }
    })

    const validatePassword = (userData: ProfileFormData) => {
        if (!userData.password) return true
        if (userData.password === userData.newPassword && userData.password?.length > 0) return false
        return true
    }

    const onSubmit = handleSubmit(async (userData) => {
        if (!validatePassword(userData)) return
        await updateProfileData.mutateAsync(userData)
    })

    const handleLogout = () => showSelection({
        title: "Sair",
        message: "Tem certeza que deseja sair da sua conta?",
        options: [
            {
                text: "Continuar logado",
                onPress: closeModal,
                variant: "primary"
            },
            {
                variant: "danger",
                onPress: () => {
                    logout()
                    clearCart()
                    closeModal()
                },
                text: "Sair"
            }
        ]

    })

    return {
        onSubmit,
        control,
        avatarURI,
        isSubmitting,
        handleLogout,
        handleSelectImage,
    }
}
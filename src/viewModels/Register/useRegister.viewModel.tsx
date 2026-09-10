import { useImage } from "@/shared/hooks/useImage"
import { useUploadAvatarMutation } from "@/shared/queries/auth/use-upload-avatar.mutation"
import { phoneMask, unmaskPhone } from "@/shared/utils/phone-mask"
import { yupResolver } from "@hookform/resolvers/yup"
import { CameraType } from "expo-image-picker"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRegisterMutation } from "../../shared/queries/auth/use-register.mutation"
import { useUserStore } from "../../shared/store/user-store"
import { RegisterFormData, registerScheme } from "./register.scheme"
import { useOneSignal } from "@/shared/hooks/useOneSignal"

export const useRegisterViewModal = () => {

    const { setSession, updatedUser } = useUserStore()

    const { playerId } = useOneSignal()

    const [avatarURI, setAvatarURI] = useState<string | null>(null)

    const { handleSelectImage } = useImage({
        callBack: setAvatarURI,
        cameraType: CameraType.front
    })

    const handleSelectAvatar = async () => {
        await handleSelectImage()
    }

    const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: yupResolver(registerScheme),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: ""
        }
    })

    const uploadAvatarMutation = useUploadAvatarMutation()

    const userRegisterMutation = useRegisterMutation({
        onSucess: async () => {
            if (avatarURI) {
                const { url } = await uploadAvatarMutation.mutateAsync(avatarURI)
                updatedUser({ avatarUrl: url })
            }
        }
    })

    const onSubmit = handleSubmit(
        async (useData) => {
            const { confirmPassword, ...registerData } = useData
            await userRegisterMutation.mutateAsync({
                ...registerData,
                phone: unmaskPhone(registerData.phone),
                notificationToken: playerId
            })

        },
    )

    return {
        control,
        onSubmit,
        errors,
        handleSelectAvatar,
        avatarURI,
        phoneMask
    }
}
import { useImage } from "@/shared/hooks/useImage"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useRegisterMutation } from "../../shared/queries/auth/use-register.mutation"
import { useUserStore } from "../../shared/store/user-store"
import { RegisterFormData, registerScheme } from "./register.scheme"
import { useState } from "react"
import { CameraType } from "expo-image-picker"

export const useRegisterViewModal = () => {

    const userRegisterMutation = useRegisterMutation()

    const { setSession } = useUserStore()

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

    const onSubmit = handleSubmit(
        async (useData) => {
            const { confirmPassword, ...registerData } = useData
            const mutationResponse = await userRegisterMutation.mutateAsync(registerData)
            setSession({
                refreshToken: mutationResponse.refreshToken,
                token: mutationResponse.token,
                user: mutationResponse.user
            })
        },
    )

    return {
        control,
        onSubmit,
        errors,
        handleSelectAvatar,
        avatarURI
    }
}
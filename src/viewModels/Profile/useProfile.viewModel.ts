import { useForm } from "react-hook-form"
import { ProfileFormData, profileScheme } from "./profile.scheme"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { useUserStore } from "@/shared/store/user-store"

export const useProfileViewModel = () => {

    const { user } = useUserStore()

    const [avatarURI, setAvatarURI] = useState<string | null>(user?.avatarUrl ?? null)

    const { control, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
        resolver: yupResolver(profileScheme),
        defaultValues: {
            name: user?.name ?? "",
            email: user?.email ?? "",
            phone: user?.phone ?? "",
            newPassword: undefined,
            password: undefined
        }
    })

    const onSubmit = handleSubmit(async () => {

    })

    return {
        onSubmit,
        control,
        avatarURI
    }
}
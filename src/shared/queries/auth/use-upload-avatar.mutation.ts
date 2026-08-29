import { uploadAvatar } from "@/shared/services/auths.service"
import { useUserStore } from "@/shared/store/user-store"
import { useMutation } from "@tanstack/react-query"
import { Toast } from "toastify-react-native"

export const useUploadAvatarMutation = () => {

    const { updatedUser } = useUserStore()

    const mutation = useMutation({
        mutationFn: uploadAvatar,
        onSuccess: (response) => {
            updatedUser({ avatarUrl: response.url })
        },
        onError: (error) => {
            Toast.error("Erro ao fazer upload da foto de perfil", "top")
        }
    })

    return mutation
}
import { uploadAvatar } from "@/shared/services/auths.service"
import { useMutation } from "@tanstack/react-query"
import { Toast } from "toastify-react-native"

export const useUploadAvatarMutation = () => {

    const mutation = useMutation({
        mutationFn: uploadAvatar,
        onSuccess: (response) => {
            console.log("Response mutation avatar",response)
        },
        onError: (error) => {
            Toast.error("Erro ao fazer upload da foto de perfil", "top")
        }
    })

    return mutation
}
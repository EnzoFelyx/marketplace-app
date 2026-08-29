import { UpdateUser } from "@/shared/services/user.service"
import { useUserStore } from "@/shared/store/user-store"
import { useMutation } from "@tanstack/react-query"
import { Toast } from "toastify-react-native"

export const useUpdateProfileMutation = () => {

    const { updatedUser } = useUserStore()

    const mutation = useMutation({
        mutationFn: UpdateUser,
        onSuccess: (response) => {
            updatedUser({ ...response })
        },
        onError: (error) => {
            Toast.error(error.message ?? "Falha ao atualizar os dados do usuário")
        }
    })
    return mutation
}
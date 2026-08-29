import { useModal } from "@/shared/hooks/useModal"
import { UpdateUser } from "@/shared/services/user.service"
import { useUserStore } from "@/shared/store/user-store"
import { useMutation } from "@tanstack/react-query"
import { Toast } from "toastify-react-native"

export const useUpdateProfileMutation = () => {

    const { updatedUser } = useUserStore()

    const { showSucess } = useModal()

    const mutation = useMutation({
        mutationFn: UpdateUser,
        onSuccess: (_response, variables) => {
            updatedUser({
                name: variables.name,
                email: variables.email,
                phone: variables.phone,
            })
            showSucess({
                title: "Sucesso!",
                message: "Dados cadastrais atualizados com sucesso"
            })
        },
        onError: (error) => {
            Toast.error(error.message ?? "Falha ao atualizar os dados do usuário")
        }
    })
    return mutation
}
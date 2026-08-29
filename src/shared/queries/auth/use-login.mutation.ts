import { LoginHTTPParams } from "@/shared/interface/http/login"
import { useMutation } from "@tanstack/react-query"
import * as authService from "../../services/auths.service"
import { useUserStore } from "@/shared/store/user-store"
import { Toast } from "toastify-react-native"

export const useLoginMutation = () => {

    const { setSession } = useUserStore()

    const mutation = useMutation({
        mutationFn: (userData: LoginHTTPParams) => authService.login(userData),
        onSuccess: (response) => {
            setSession(response)
        },
        onError: (error) => {
            Toast.error(error.message ?? "Senha inválida", "top")
        }
    })

    return mutation
}
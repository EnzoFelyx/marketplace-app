import { LoginHTTPParams } from "@/shared/interface/http/login"
import { useMutation } from "@tanstack/react-query"
import * as authService from "../../services/auths.service"
import { useUserStore } from "@/shared/store/user-store"

export const useLoginMutation = () => {

    const { setSession } = useUserStore()

    const mutation = useMutation({
        mutationFn: (userData: LoginHTTPParams) => authService.login(userData),
        onSuccess: (response) => {
            setSession(response)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    return mutation
}
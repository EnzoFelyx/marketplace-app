import { LoginHTTPParams } from "@/shared/interface/http/login"
import { useMutation } from "@tanstack/react-query"
import * as authService from "../../services/auths.service"

export const useLoginMutation = () => {

    const mutation = useMutation({
        mutationFn: (userData: LoginHTTPParams) => authService.login(userData),
        onSuccess: (response) => {
            console.log(response)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    return mutation
}
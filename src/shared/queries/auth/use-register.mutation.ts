import { useMutation } from "@tanstack/react-query"
import { RegisterHTTPParams } from "../../interface/http/register"
import * as authService from "../../services/auths.service"

export const useRegisterMutation = () => {

    const mutation = useMutation({
        mutationFn: (userData: RegisterHTTPParams) => authService.register(userData),
        onSuccess: (response) => {
            console.log(response)
        },
        onError: (error) => {
            console.log(error)
        }
    })
    
    return mutation
}
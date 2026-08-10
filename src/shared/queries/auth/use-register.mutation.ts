import { useUserStore } from "@/shared/store/user-store"
import { useMutation } from "@tanstack/react-query"
import { RegisterHTTPParams } from "../../interface/http/register"
import * as authService from "../../services/auths.service"

interface Props {
    onSucess?: () => void
}

export const useRegisterMutation = ({ onSucess }: Props = {}) => {

    const { setSession } = useUserStore()

    const mutation = useMutation({
        mutationFn: (userData: RegisterHTTPParams) => authService.register(userData),
        onSuccess: (response) => {
            console.log("REGISTER RESPONSE", response)
            setSession({
                refreshToken: response.refreshToken,
                token: response.token,
                user: response.user
            })
            onSucess?.()
        },
        onError: (error) => {
            console.log(error)
        }
    })

    return mutation
}
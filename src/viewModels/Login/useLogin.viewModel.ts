import { useLoginMutation } from "@/shared/queries/auth/use-login.mutation"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { LoginFormData, loginScheme } from "./login.scheme"
import { useOneSignal } from "@/shared/hooks/useOneSignal"

export const useLoginViewModel = () => {

    const { playerId } = useOneSignal()

    const {
        control,
        handleSubmit,
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginScheme),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const loginMutation = useLoginMutation()

    const onSubmit = handleSubmit((userFormData) => {
        loginMutation.mutate({ ...userFormData, notificationToken: playerId })
    })

    return {
        control,
        onSubmit
    }

}
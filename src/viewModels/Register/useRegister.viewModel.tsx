import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useRegisterMutation } from "../../shared/queries/auth/use-register.mutation"
import { useUserStore } from "../../shared/store/user-store"
import { RegisterFormData, registerScheme } from "./register.scheme"

export const useRegisterViewModal = () => {

    const userRegisterMutation = useRegisterMutation()

    const { setSession, user } = useUserStore()

    const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: yupResolver(registerScheme),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: ""
        }
    })

    const onSubmit = handleSubmit(
        async (useData) => {
            const { confirmPassword, ...registerData } = useData
            const mutationResponse = await userRegisterMutation.mutateAsync(registerData)
            setSession({
                refreshToken: mutationResponse.refreshToken,
                token: mutationResponse.token,
                user: mutationResponse.user
            })
        },
    )

    console.log('logado:', user) 

    return {
        control,
        onSubmit,
        errors
    }
}
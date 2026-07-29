import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { RegisterFormData, registerScheme } from "./register.scheme"
import { useRegisterMutation } from "../../shared/queries/auth/use-register.mutation"

export const useRegisterViewModal = () => {

    const userRegisterMutation = useRegisterMutation()

    const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: yupResolver(registerScheme),
        defaultValues: {
            name: "testenzo",
            email: "testenzo@gmail.com",
            password: "123123",
            confirmPassword: "123123",
            phone: "13999999999"
        }
    })

    const onSubmit = handleSubmit(
        async (useData) => {
            const { confirmPassword, ...registerData } = useData
            await userRegisterMutation.mutateAsync(registerData)
        },
        (validationErrors) => {
            console.log("❌ Validação falhou:", validationErrors)
        }
    )

    return {
        control,
        onSubmit,
        errors
    }
}
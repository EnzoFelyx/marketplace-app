import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useRegisterMutation } from "../../shared/queries/auth/use-register.mutation"
import { useUserStore } from "../../shared/store/user-store"
import { RegisterFormData, registerScheme } from "./register.scheme"
import { useModal } from "@/shared/hooks/useModal"

export const useRegisterViewModal = () => {

    const userRegisterMutation = useRegisterMutation()

    const { setSession, user } = useUserStore()

    const modals = useModal()

    const HandleSelect = () => {
        modals.showSelection({
            title: "Selecionar foto",
            message: "Escolha uma opção",
            options: [
                {
                    text: "Galeria",
                    icon: "images",
                    variant: "primary",
                    onPress: ()=> alert("galeria!")
                },
                {
                    text: "Câmera",
                    icon: "camera",
                    variant: "primary",
                    onPress: ()=> alert("camera!")
                }
            ]
        })
    }

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
        errors,
        HandleSelect
    }
}
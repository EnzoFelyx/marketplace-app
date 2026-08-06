import { useForm } from "react-hook-form"
import { LoginFormData, loginScheme } from "./login.scheme"
import { yupResolver } from "@hookform/resolvers/yup"

export const useLoginViewModel = () => {

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

    return {
        control,
        handleSubmit,
    }

}
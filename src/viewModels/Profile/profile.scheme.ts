import * as yup from "yup"

export const profileScheme: yup.ObjectSchema<{
    name: string;
    email: string;
    phone: string;
    password?: string;
    newPassword?: string;
}> = yup.object({
    name: yup.string().required("O nome é obrigatório").min(4, "Nome deve ter pelo menos 4 caracteres"),
    email: yup.string().email("Digite um e-mail válido").required("O e-mail é obrigatório"),
    phone: yup.string().required("Telefone é obrigatório").matches(/^\d{11}$/, "Digite um telefone válido com 11 dígitos"),
    password: yup.string().min(6, "A senha deve ter no mínimo 6 caracteres").optional(),
    newPassword: yup.string().optional()
})

export type ProfileFormData = yup.InferType<typeof profileScheme>
import * as yup from "yup"

export const loginScheme = yup.object({
   email: yup.string().email("Digite um e-mail válido").required("O e-mail é obrigatório"),
   password: yup.string().min(6, "A senha deve ter no mínimo 6 caracteres").required("A senha é obrigatória"),
})

export type LoginFormData = yup.InferType<typeof loginScheme>

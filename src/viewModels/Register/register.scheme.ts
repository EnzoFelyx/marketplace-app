import * as yup from "yup"

export const registerScheme = yup.object({
   name: yup.string().required("O nome é obrigatório").min(4, "Nome deve ter pelo menos 4 caracteres"),
   email: yup.string().email("Digite um e-mail válido").required("O e-mail é obrigatório"),
   password: yup.string().min(6, "A senha deve ter no mínimo 6 caracteres").required("A senha é obrigatória"),
   confirmPassword: yup.string().oneOf([yup.ref("password")], "As senhas devem ser iguais").required("A confirmação de senha é obrigatória"),
   phone: yup.string().required("Telefone é obrigatório").matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Digite um telefone válido com 11 dígitos"),
})

export type RegisterFormData = yup.InferType<typeof registerScheme>
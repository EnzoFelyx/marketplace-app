import { useCreateCreditCardMutation } from "@/shared/queries/credit-cards/use-create-credit-card.mutation"
import { useBottomSheetStore } from "@/shared/store/bottomsheet-store"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { creditCardFormData, creditCardSchema } from "./credit-card.schema"

export const useCardBottomSheetViewModel = () => {

    const createCreditCardMutation = useCreateCreditCardMutation()

    const { close: closeBottomSheet } = useBottomSheetStore()

    const { control, handleSubmit, reset, watch, clearErrors } = useForm<creditCardFormData>({
        resolver: yupResolver(creditCardSchema),
        defaultValues: {
            titularName: "",
            number: "",
            CVV: "",
            expirationDate: ""
        }
    })

    const handleCreateCreditCard = () => {
        createCreditCardMutation.mutate({
            CVV: 123,
            expirationDate: "",
            number: ""
        })
    }

    const expirationDateMask = (value: string) => {
        const cleaned = value.replace(/\D/g, "")

        if (cleaned.length <= 2) {
            return cleaned
        }
        const mounth = cleaned.slice(0, 2)
        const year = cleaned.slice(2, 4)

        if (year.length > 0) {
            return `${mounth}/${year}`
        }
        return mounth
    }

    const cardNumberMask = (value: string) => {
        const cleaned = value.replace(/\D/g, '')
        return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
    }

    return {
        handleCreateCreditCard,
        control,
        handleSubmit,
        expirationDateMask,
        cardNumberMask,
        closeBottomSheet
    }
}
import { useCreateCreditCardMutation } from "@/shared/queries/credit-cards/use-create-credit-card.mutation"
import { useBottomSheetStore } from "@/shared/store/bottomsheet-store"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { creditCardFormData, creditCardSchema } from "./credit-card.schema"

const formartExpiration = (dateString: string, setError: (message: string) => void): string => {
    const [month, year] = dateString.split("/").map(Number)
    if (month < 1 || month > 12) {
        setError("Mês inválido")
        throw new Error("Mês inválido!")
    } if (year < 0 || year > 99) {
        setError("Ano inválido")
        throw new Error("Ano inválido")
    }

    const fullYear = 2000 + year

    const expirationDate = new Date(fullYear, month, 0)

    const isoDate = expirationDate.toISOString().split("T")[0]

    return isoDate
}

export const useCardBottomSheetViewModel = () => {

    const createCreditCardMutation = useCreateCreditCardMutation()

    const { close: closeBottomSheet } = useBottomSheetStore()

    const { control, handleSubmit, reset, watch, clearErrors, setError } = useForm<creditCardFormData>({
        resolver: yupResolver(creditCardSchema),
        defaultValues: {
            titularName: "",
            number: "",
            CVV: "",
            expirationDate: ""
        }
    })

    const handleCreateCreditCard = handleSubmit(async ({
        CVV,
        expirationDate: rawExpiration,
        number,
    }) => {
        const expirationDate = formartExpiration(rawExpiration, (message) => {
            setError("expirationDate", { message })
        })
        const cleanedNumber = number.replace(/\s/g, "")
        await createCreditCardMutation.mutateAsync({
            CVV: Number(CVV),
            expirationDate,
            number: cleanedNumber
        })
        closeBottomSheet()
    })

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
        expirationDateMask,
        cardNumberMask,
        closeBottomSheet
    }
}
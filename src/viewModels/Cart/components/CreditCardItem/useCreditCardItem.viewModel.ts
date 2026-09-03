import { CreditCard } from "@/shared/interface/credit.card"

import { format } from "date-fns"

export const useCreditCardItemViewModel = (creditCard: CreditCard) => {

    const formartedExpirationDate = format(creditCard.expirationDate, "MM/yyyy")

    const formatedCardNumber = creditCard.number.slice(-4)

    return {
        creditCard,
        formartedExpirationDate,
        formatedCardNumber
    }
}
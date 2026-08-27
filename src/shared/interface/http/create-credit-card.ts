import { CreditCard } from "../credit.card"

export interface CreateCreditCardResponse {
    data: CreditCard
    message: string
    sucess: boolean
}

export interface CreateCreditCardRequest {
    number: string
    CVV: number
    expirationDate: string
}
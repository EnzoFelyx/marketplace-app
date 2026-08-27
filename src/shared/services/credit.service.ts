import { marketPlaceApi } from "../api/marketplace"
import { CreditCard } from "../interface/credit.card"
import { CreateCreditCardRequest, CreateCreditCardResponse, } from "../interface/http/create-credit-card"

export const getCreditCard = async () => {
    const { data } = await marketPlaceApi.get<CreditCard[]>("/credit-cards")
    return data
}

export const createCreditCard = async (creditCardData: CreateCreditCardRequest) => {
    const { data } = await marketPlaceApi.post<CreateCreditCardResponse>("/credit-cards", creditCardData)
    return data
}
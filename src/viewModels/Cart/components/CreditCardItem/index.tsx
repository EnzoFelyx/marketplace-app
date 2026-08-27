import { CreditCard } from "@/shared/interface/credit.card"
import { FC } from "react"
import { CreditCardItemView } from "./CreditCardItem.view"
import { useCreditCardItemViewModel } from "./useCreditCardItem.viewModel"

interface Props {
    creditCard: CreditCard
}

export const CreditCardItem: FC<Props> = ({ creditCard }) => {

    const viewModel = useCreditCardItemViewModel(creditCard)

    return (
        <CreditCardItemView {...viewModel} />
    )
}
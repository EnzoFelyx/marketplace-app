import { CreditCard } from "@/shared/interface/credit.card"
import { FC } from "react"
import { CreditCardItemView } from "./CreditCardItem.view"
import { useCreditCardItemViewModel } from "./useCreditCardItem.viewModel"

interface Props {
    creditCard: CreditCard
    isSelected: boolean
    setSelectedCreditCard: (creditCard: CreditCard) => void
}

export const CreditCardItem: FC<Props> = ({
    creditCard,
    isSelected,
    setSelectedCreditCard
}) => {

    const viewModel = useCreditCardItemViewModel(creditCard)

    return (
        <CreditCardItemView
            isSelectted={isSelected}
            setSelectedCreditCard={setSelectedCreditCard}
            {...viewModel}
        />
    )
}
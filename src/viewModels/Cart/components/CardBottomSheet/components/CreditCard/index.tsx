import { FC } from "react"
import { FocusedField } from "../../useCardBottomSheet.viewModel"
import { CreditCardView } from "./CreditCard.view"
import { useCreditCardViewModel } from "./useCreditCard.viewModel"

export interface CardData {
    number: string;
    name: string;
    expiry: string;
    cvv: string;
}

interface Props {
    isFlipped: boolean
    focusedField: FocusedField | null
    CardData: CardData
}

export const CreditCard: FC<Props> = ({ focusedField, isFlipped, CardData }) => {

    const viewModel = useCreditCardViewModel(isFlipped)

    return <CreditCardView CardData={CardData} focusedField={focusedField} {...viewModel} />
}
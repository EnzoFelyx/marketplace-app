import { FC } from "react"
import { FocusedField } from "../../useCardBottomSheet.viewModel"
import { CreditCardView } from "./CreditCard.view"
import { useCreditCardViewModel } from "./useCreditCard.viewModel"

interface Props {
    isFlipped: boolean
    focusedField: FocusedField | null
}

export const CreditCard: FC<Props> = ({ focusedField, isFlipped }) => {

    const viewModel = useCreditCardViewModel(isFlipped)

    return <CreditCardView focusedField={focusedField} {...viewModel} />
}
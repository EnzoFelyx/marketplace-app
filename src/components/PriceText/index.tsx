import { PriceTextView } from "./PriceTextView"
import { usePriceTextViewModel } from "./usePriceTextViewModel"

interface Props {
    classNameCurrency?: string
    classNameValue?: string
    value: number
}

export const PriceText = ({
    value,
    classNameCurrency,
    classNameValue
}: Props) => {

    const viewModel = usePriceTextViewModel(value)

    return <PriceTextView {...viewModel} classNameCurrency={classNameCurrency} classNameValue={classNameValue} />
}
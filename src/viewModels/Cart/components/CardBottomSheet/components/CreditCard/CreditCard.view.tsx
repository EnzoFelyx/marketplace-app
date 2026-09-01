import { FC } from "react"
import { Text, View } from "react-native"
import { useCreditCardViewModel } from "./useCreditCard.viewModel"
import { FocusedField } from "../../useCardBottomSheet.viewModel"

export const CreditCardView: FC<ReturnType<typeof useCreditCardViewModel> & {focusedField: FocusedField | null}> = ({

}) => {

    return (
        <View className="h-[192px] w-[300px]">
            <Text>Cartao</Text>
        </View>
    )
}
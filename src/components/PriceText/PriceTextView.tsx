import { FC } from "react";
import { usePriceTextViewModel } from "./usePricetextViewModel";
import { Text, View } from "react-native";

export const PriceTextView: FC<ReturnType<typeof usePriceTextViewModel> & {
    classNameCurrency?: string
    classNameValue?: string
}> = ({
    classNameCurrency,
    classNameValue,
    currencySymbol,
    formatPrice,
    value,
    valueText
}) => {

    return (
        <View className="flex-row items-baseline">
            <Text className={classNameCurrency ?? "text-sm text-black"}>{currencySymbol}</Text>
            <Text className={classNameValue ?? "text-2xl font-bold text-black"}> {valueText}</Text>
        </View>
    )
}
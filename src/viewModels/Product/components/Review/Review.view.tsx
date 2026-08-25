import { FC } from "react";
import { useReview } from "./useReview.viewModel";
import { Text, View } from "react-native";

export const ReviewView: FC<ReturnType<typeof useReview>> = ({

}) => {

    return (
        <View>
            <Text>Review do produto</Text>
        </View>
    )
}
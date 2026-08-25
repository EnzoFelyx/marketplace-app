import { colors } from "@/styles/colors"
import { Ionicons } from "@expo/vector-icons"
import { FC } from "react"
import { TouchableOpacity } from "react-native"

interface Props {
    rating: number
    handleRatingChange: (rating: number) => void
}

export const Stars: FC<Props> = ({ rating, handleRatingChange }) => {
    return Array.from({ length: 5 }, (_, index) => {

        const starNumber = index + 1

        const isSelected = starNumber <= rating

        return (
            <TouchableOpacity
                onPress={() => handleRatingChange(starNumber)}
                key={`star-${index}`}
            >
                <Ionicons
                    name={isSelected ? "star" : "star-outline"}
                    color={isSelected ? colors["purple-base"] : colors.gray[200]}
                    size={32}
                />
            </TouchableOpacity>
        )
    })
}
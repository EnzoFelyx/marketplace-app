import { FC } from "react"
import { ReviewView } from "./Review.view"
import { useReview } from "./useReview.viewModel"

interface Props {
    productId: number
}

export const Review: FC<Props> = ({
    productId
}) => {

    const viewModel = useReview(productId)

    return <ReviewView {...viewModel} />
}
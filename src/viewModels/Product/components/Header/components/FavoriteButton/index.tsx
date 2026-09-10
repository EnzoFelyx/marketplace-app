import { FC } from "react"
import { FavoriteButtonView } from "./FavoriteButton.view"
import { useFavoriteButtonViewModel } from "./useFavoriteButton.viewModel"

interface Props {
    productId: number
}

export const FavoriteButton: FC<Props> = ({ productId }) => {

    const viewModel = useFavoriteButtonViewModel(productId)

    return <FavoriteButtonView {...viewModel} />
}
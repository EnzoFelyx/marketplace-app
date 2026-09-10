import { useAddFavoriteMutation } from "@/shared/queries/favorites/use-add-favorite.mutation"
import { useGetFavoritesQuery } from "@/shared/queries/favorites/use-get-favorites.query"
import { useRemoveFavoriteMutation } from "@/shared/queries/favorites/use-remove-favorite.mutation"
import { useMemo } from "react"

export const useFavoriteButtonViewModel = (productId: number) => {

    const { data: favorites = [], isLoading: isLoadingFavorites } = useGetFavoritesQuery()

    const addFavoriteMutation = useAddFavoriteMutation()

    const removeFavoriteMutation = useRemoveFavoriteMutation()

    const isFavorite: boolean = useMemo(() => {
        return favorites.some(favorite => favorite.productId === productId)
    }, [favorites, productId])

    const handleToggleFavorite = async () => {
        if (isFavorite) {
            await removeFavoriteMutation.mutateAsync(productId)
        } else {
            await addFavoriteMutation.mutateAsync(productId)
        }
    }

    const loading = addFavoriteMutation.isPending || removeFavoriteMutation.isPending || isLoadingFavorites

    return {
        loading,
        isFavorite,
        handleToggleFavorite
    }
}
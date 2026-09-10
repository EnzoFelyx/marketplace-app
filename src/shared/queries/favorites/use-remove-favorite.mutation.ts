import { removeFavorite } from "@/shared/services/favorites.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Toast } from "toastify-react-native"

export const useRemoveFavoriteMutation = () => {

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: removeFavorite,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] })
        },
        onError: (error) => {
            Toast.error(error.message ?? "Falha ao remover favorito")
        }
    })
    return mutation
}
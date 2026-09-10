import { addFavorite } from "@/shared/services/favorites.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Toast } from "toastify-react-native"

export const useAddFavoriteMutation = () => {

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: addFavorite,
        onSuccess: () => {
            Toast.success("Favorito adicionado com sucesso")
            queryClient.invalidateQueries({ queryKey: ['favorites'] })
        },
        onError: (error) => {
            Toast.error(error.message ?? "Falha ao adicionar favorito")
        }
    })

    return mutation
}
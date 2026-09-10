import { getFavorites } from "@/shared/services/favorites.service"
import { useQuery } from "@tanstack/react-query"

export const useGetFavoritesQuery = () => {

    const query = useQuery({
        queryKey: ['favorites'],
        queryFn: getFavorites,
        staleTime: 1000 * 60 * 5,
    })

    return query
}
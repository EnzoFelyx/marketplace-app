import { getCreditCard } from "@/shared/services/credit.service"
import { useQuery } from "@tanstack/react-query"

export const useGetCreditCards = () => {

    const query = useQuery({
        queryFn: getCreditCard,
        queryKey: ["credit-cards"],
        staleTime: 1000 * 60 * 5
    })

    return query
}


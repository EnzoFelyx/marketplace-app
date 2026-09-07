import { Skeleton } from "@/components/Skeleton"
import { FC } from "react"
import { View } from "react-native"

export const ProductCardSkeleton = () => {

    return (
        <Skeleton className="w-[48%] my-11 rounded-xl shadow-sm overflow-hidden p-[4px] bg-white mb-2">
            <View className="w-full h-[96px] rounded-[6px] bg-shape" />
            <View className="px-2 pt-2 pb-1">
                <View className="h-3 w-full rounded-[4px] bg-shape mb-1" />
                <View className="h-3 w-2/3 rounded-[4px] bg-shape mb-2" />
                <View className="h-5 w-1/2 rounded-[4px] bg-shape" />
            </View>
        </Skeleton>
    )
}

interface ListProps {
    count?: number
}

export const ProductCardSkeletonList: FC<ListProps> = ({ count = 6 }) => {

    return (
        <View className="flex-row flex-wrap justify-between items-start mt-10">
            {Array.from({ length: count }).map((_, index) => (
                <ProductCardSkeleton key={`product-card-skeleton-${index}`} />
            ))}
        </View>
    )
}

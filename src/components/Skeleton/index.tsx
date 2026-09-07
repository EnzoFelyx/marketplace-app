import { useSkeletonAnimation } from "@/shared/hooks/useSkeletonAnimation"
import { FC, PropsWithChildren } from "react"
import Animated from "react-native-reanimated"

type Props = PropsWithChildren<{
    className?: string
}>

export const Skeleton: FC<Props> = ({ className, children }) => {

    const animatedStyle = useSkeletonAnimation()

    return (
        <Animated.View className={className} style={animatedStyle}>
            {children}
        </Animated.View>
    )
}

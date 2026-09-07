import { useEffect } from "react"
import { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated"

export const useSkeletonAnimation = (duration: number = 800) => {

    const pulseValue = useSharedValue(0.4)

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: pulseValue.value
    }))

    useEffect(() => {
        pulseValue.value = withRepeat(
            withTiming(1, {
                duration,
                easing: Easing.inOut(Easing.ease)
            }),
            -1,
            true
        )
    }, [duration])

    return animatedStyle
}

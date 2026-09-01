import { useEffect } from "react"
import { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

export const useCreditCardViewModel = (isFlipped: boolean) => {

    const flipValue = useSharedValue(0)

    const frontAnimatedStyle = useAnimatedStyle(() => {
        const rotateValue = interpolate(flipValue.value, [0, 1], [0, 180])
        return {
            transform: [{ rotateY: `${rotateValue}deg` }]
        }
    })

    const backAnimatedStyle = useAnimatedStyle(() => {
        const rotateValue = interpolate(flipValue.value, [0, 1], [180, 360])
        return {
            transform: [{ rotateY: `${rotateValue}deg` }]
        }
    })

    useEffect(() => { 
        flipValue.value = withTiming(isFlipped ? 1 : 0, {
            duration: 600,
        })
    }, [isFlipped])

    return {
        frontAnimatedStyle,
        backAnimatedStyle,
    }
}
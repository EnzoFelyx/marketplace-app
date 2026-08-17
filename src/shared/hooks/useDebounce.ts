import { useEffect, useState } from "react"

export const useDebounce = <T>(value: T, delay: number = 500) => {

    const [debouncedValue, setDebounceValue] = useState<T>(value)

    useEffect(() => {
        const timeouId = setInterval(() => {
            setDebounceValue(value)
        }, delay)

        return () => clearTimeout(timeouId)
    }, [value, delay])

    return debouncedValue

}
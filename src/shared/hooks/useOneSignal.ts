import { router } from "expo-router"
import { useEffect, useState } from "react"
import { NotificationClickEvent, OneSignal } from "react-native-onesignal"

const ONESIGNAL_APP_ID = process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID

export const useOneSignal = () => {

    const [playerId, setPlayerId] = useState<string | undefined>(undefined)

    useEffect(() => {
        const handleClick = (e: NotificationClickEvent) => {
            const url = e.notification.launchURL
            if (url) {
                const path = url.replace(/^[a-z-]+:\/\//, "/")
                router.push(path)
            }
        }

        OneSignal.Notifications.addEventListener("click", handleClick)

        if (!ONESIGNAL_APP_ID) {
            console.log("[OneSignal] - ONESIGNAL_APP_ID is not defined")
            return () => OneSignal.Notifications.removeEventListener("click", handleClick)
        }
        OneSignal.initialize(ONESIGNAL_APP_ID);

        (async () => {
            const playerId = await OneSignal.User.pushSubscription.getIdAsync()
            if (playerId) {
                setPlayerId(playerId)
            }
            console.log("[OneSignal] - Player ID:", playerId)
        })()

        return () => OneSignal.Notifications.removeEventListener("click", handleClick)
    }, [])

    return {
        playerId
    }
}

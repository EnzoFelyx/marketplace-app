import { useEffect, useState } from "react"
import { OneSignal } from "react-native-onesignal"

const ONESIGNAL_APP_ID = process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID

export const useOneSignal = () => {

    const [playerId, setPlayerId] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (!ONESIGNAL_APP_ID) {
            console.log("[OneSignal] - ONESIGNAL_APP_ID is not defined")
            return
        }
        OneSignal.initialize(ONESIGNAL_APP_ID);

        (async () => {
            const playerId = await OneSignal.User.pushSubscription.getIdAsync()
            if (playerId) {
                setPlayerId(playerId)
            }
            console.log("[OneSignal] - Player ID:", playerId)
        })()
    }, [])

    return {
        playerId
    }
}
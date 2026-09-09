import { colors } from "@/styles/colors"
import * as Notifications from "expo-notifications"
import { Platform } from "react-native"

const DEFAULT_CHANNEL = "default"

const NOTIFICATION_IDS = {
    CART_REMINDER: "cart-reminder",
    PURCHASE_FEEDBACK: "purchase-feedback",
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldShowBanner: true,
        shouldSetBadge: false,
        shouldShowList: true,
    })
})

const requestPermission = async (): Promise<boolean> => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()

    let finalStatus = existingStatus

    if (existingStatus === "granted") {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
    }
    return finalStatus === "granted"
}

const setupNotificationChannel = async () => {
    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync(DEFAULT_CHANNEL, {
            name: "Notificações do Marketplace",
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: colors["purple-base"],
        })
    }
}

interface ScheduleNotificationParams {
    productName: string
    productId: number
    delayInMinutes: number
}

const scheduleCartReminder = async ({
    delayInMinutes,
    productId,
    productName
}: ScheduleNotificationParams) => {
    const hasPermission = await requestPermission()
    if (!hasPermission) {
        console.log("Permissão para notificações não concedida.")
        return
    }

    const notification = await Notifications.scheduleNotificationAsync({
        identifier: NOTIFICATION_IDS.CART_REMINDER,
        content: {
            title: "Finalize a sua compra!",
            body: `O produto ${productName} ainda está esperando por você.`,
            data: {
                type: "cart-reminder",
                productId: String(productId),
            },
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: delayInMinutes * 60,
        }
    })
    return notification
}

export const localNotificationsService = {
    setupNotificationChannel,
    scheduleCartReminder,
    requestPermission,
}
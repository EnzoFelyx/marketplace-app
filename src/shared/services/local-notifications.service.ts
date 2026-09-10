import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import { colors } from '../../styles/colors'

const DEFAULT_CHANNEL = 'default'

const NOTIFICATION_IDS = {
  CART_REMINDER: 'cart-reminder',
  PURCHASE_FEEDBACK: 'purchase-feedback',
}

const DEEP_LINK = 'marketplace-app://'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldShowBanner: true,
    shouldSetBadge: false,
    shouldShowList: true,
  }),
})

const requestPermissions = async (): Promise<boolean> => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync()

  let finalStatus = existingStatus

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }

  return finalStatus === 'granted'
}

const cancelNotifications = async (notificationId: string) => {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId)
  } catch (error) {
    console.log(`[LocalNotifications] - Error canceling notification with ID ${notificationId}:`, error)
  }
}

const setupNotificationChannel = async () => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(DEFAULT_CHANNEL, {
      name: 'Notificações do Marketplace',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: colors['purple-base'],
    })
  }
}

interface ScheduleProductInterface {
  productName: string
  productId: number
  delayInMinutes: number
}

const scheduleCartReminder = async ({
  productName,
  productId,
  delayInMinutes,
}: ScheduleProductInterface) => {
  const hasPermission = await requestPermissions()

  if (!hasPermission) {
    console.log('[LocalNotifications] - Permission not granted')
    return
  }

  await Notifications.scheduleNotificationAsync({
    identifier: `${NOTIFICATION_IDS.CART_REMINDER}-${productId}`,
    content: {
      title: 'Você esqueceu algo no carrinho!',
      body: `O produto ${productName} está esperando por você. Finalize sua compra agora!`,
      data: {
        type: 'cart_reminder',
        productId: String(productId),
        deepLink: `${DEEP_LINK}cart`,
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: delayInMinutes * 60,
    },
  })
}

const scheduleFeedbackNotification = async ({
  productName,
  productId,
  delayInMinutes,
}: ScheduleProductInterface) => {
  const hasPermission = await requestPermissions()

  if (!hasPermission) {
    console.log('[LocalNotifications] - Permission not granted')
    return
  }

  await Notifications.scheduleNotificationAsync({
    identifier: `${NOTIFICATION_IDS.PURCHASE_FEEDBACK}-${productId}`,
    content: {
      title: '⭐️ Como foi a sua compra?',
      body: `Você realizou o pedido do produto "${productName}". Envie um feedback do que achou do produto!`,
      data: {
        type: 'purchase_feedback',
        productId: String(productId),
        deepLink: `${DEEP_LINK}product/${productId}?openFeedbackBottomsheet=true`,
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: delayInMinutes * 60,
    },
  })
}

export const localNotificationsService = {
  scheduleCartReminder,
  requestPermissions,
  setupNotificationChannel,
  scheduleFeedbackNotification,
  cancelNotifications,
  NOTIFICATION_IDS,
}
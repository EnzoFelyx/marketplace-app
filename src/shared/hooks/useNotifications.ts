import * as Notifications from 'expo-notifications'
import { useEffect } from 'react'
import { Linking } from 'react-native'
import { localNotificationsService } from '../services/local-notifications.service'

export const useNotifications = () => {
    
  useEffect(() => {
    localNotificationsService.requestPermissions()
    localNotificationsService.setupNotificationChannel()

    const lastResponse = Notifications.getLastNotificationResponse()

    if (lastResponse) {
      const deepLink = lastResponse.notification.request.content.data?.deepLink

      if (deepLink && typeof deepLink === 'string') {
        Linking.openURL(deepLink)
      }
    }

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const deepLink = response.notification.request.content.data?.deepLink

        if (deepLink && typeof deepLink === 'string') {
          Linking.openURL(deepLink)
        }
      },
    )

    return () => subscription.remove()
  }, [])

  return {}
}
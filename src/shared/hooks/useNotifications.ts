import { useEffect } from "react"
import { localNotificationsService } from "../services/local-notifications.service"

export const useNotification = () => {

    useEffect(()=> {
        localNotificationsService.requestPermission()
        localNotificationsService.setupNotificationChannel()
    },[])

    return {

    }
}
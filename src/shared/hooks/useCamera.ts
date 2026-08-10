import { useCallback, useState } from "react"
import * as ImagePicker from "expo-image-picker"
import { Toast } from 'toastify-react-native'

export const useCamera = (imagePicker: ImagePicker.ImagePickerOptions) => {

    const [isLoading, setIsLoading] = useState(false)

    const requestCameraPermission = useCallback(async (): Promise<boolean> => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync()

            const currentStatus = status === "granted"

            if (!currentStatus) {
                Toast.error("Permissão necessária para acessar a câmera", "top")
            }

            return currentStatus

        } catch (error) {
            Toast.error("Erro ao solicitar permissão da câmera!", "top")
            return false
        }
    }, [])

    const openCamera = useCallback(async (): Promise<string | null> => {
        setIsLoading(true)
        console.log('chamei')
        try {
            const hasPermission = await requestCameraPermission()
            if (!hasPermission) return null

            const result = await ImagePicker.launchCameraAsync(imagePicker)

            if (!result.canceled && result.assets && result.assets.length > 0) {
                Toast.success("Foto capturada com sucesso!", "top")
                return result.assets[0].uri
            }
            return null
        } catch (error) {
            Toast.error("Erro ao abrir a camera", "top")
            return null
        } finally {
            setIsLoading(false)
        }
    }, [])

    return {
        isLoading,
        requestCameraPermission,
        openCamera
    }
}
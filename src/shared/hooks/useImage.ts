import { ImagePickerOptions } from "expo-image-picker"
import { useCamera } from "./useCamera"
import { useGallery } from "./useGallery"
import { useModal } from "./useModal"
import { useModalStore } from "../store/modal-store"

interface Props extends ImagePickerOptions {
    callBack: (uri: string | null) => void
}

export const useImage = ({
    callBack,
    ...pickerOptions
}: Props) => {

    const modals = useModal()
    const { openCamera, isLoading: cameraLoading } = useCamera(pickerOptions)
    const { openGallery, isLoading: galleryLoading } = useGallery(pickerOptions)

    const loading = Boolean(cameraLoading || galleryLoading)

    const { closeModal } = useModalStore()

    const handleCallBack = (uri: string | null) => {
        closeModal()
        callBack(uri)
    }

    const handleSelectImage = () => {
        modals.showSelection({
            title: "Selecionar foto",
            message: "Escolha uma opção",
            options: [
                {
                    text: "Galeria",
                    icon: "images",
                    variant: "primary",
                    onPress: async () => {
                        const imageURI = await openGallery()
                        handleCallBack(imageURI)
                    }
                },
                {
                    text: "Câmera",
                    icon: "camera",
                    variant: "primary",
                     onPress: async () => {
                        const imageURI = await openCamera()
                        handleCallBack(imageURI)
                    }
                }
            ]
        })
    }

    return {
        handleSelectImage,
        loading
    }
}
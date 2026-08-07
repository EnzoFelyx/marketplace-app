import { useModalStore } from "@/shared/store/modal-store"
import { Modal as RNModal, TouchableWithoutFeedback, View } from "react-native"

export const Modal = () => {

    const { isOpen, content, config, closeModal } = useModalStore()

    if (!isOpen || !content) return null

    return (
        <RNModal
            visible={isOpen}
            animationType={config.animationType}
            transparent={config.transparent}
            statusBarTranslucent={config.statusBarTranslucent}
            onRequestClose={closeModal}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View className="flex-1 bg-black/50 justify-center items-center px-6">
                    <TouchableWithoutFeedback onPress={() => { }}>
                        {content}
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </RNModal>
    )
}
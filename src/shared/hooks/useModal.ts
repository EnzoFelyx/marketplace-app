import { SelectionModal, SelectionModalProps } from "@/components/Modal/SelectionModal"
import { Ionicons } from "@expo/vector-icons"
import { createElement } from "react"
import { useModalStore } from "../store/modal-store"

export interface SelectionOptions {
    text: string
    onPress: () => void
    icon?: keyof typeof Ionicons.glyphMap
    variant?: SelectionVariant
}

export type SelectionVariant =  "primary" | "secondary" | "danger"

export const useModal = () => {

    const { openModal, closeModal } = useModalStore()

    const showSelection = ({
        title,
        message,
        options
    }: {
        title: string,
        message?: string,
        options: SelectionOptions[]
    }) => {
        openModal(createElement(SelectionModal, { //componente .ts, sendo assim não é possível fazer abordagem <SelectModal/>
            options,
            title,
            message
        } as SelectionModalProps))
    }

    return {
        showSelection
    }
}
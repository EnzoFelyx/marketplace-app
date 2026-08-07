import { create } from "zustand"

interface ModalConfig {
    animationType?: "slide" | "fade" | "none"
    transparent?: boolean
    statusBarTranslucent?: boolean
}

interface ModalStore {
    isOpen: boolean
    content: React.ReactNode | null
    config: ModalConfig
    openModal: (content: React.ReactNode, config?: ModalConfig) => void
    closeModal: () => void
}

export const useModalStore = create<ModalStore>((set, get) => ({
    isOpen: false,
    content: null,
    config: {
        animationType: "fade",
        statusBarTranslucent: false,
        transparent: true,
    },

    openModal: (content, config) => set({
        isOpen: true,
        content,
        config: {
            ...get().config,
            ...config,
        }
    }),
    closeModal: () => set({
        content: null,
        isOpen: false,
    })
}))
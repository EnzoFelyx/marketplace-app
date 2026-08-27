import { ReactNode } from "react";
import { create } from "zustand";

interface ConfigProps {
    snapPoints?: string[]
    enablePanDownToClose?: boolean
    keyboardBehavior?: "interactive" | "extend" | "fillParent"
}

interface Props {
    isOpen: boolean
    content: ReactNode | null
    config: ConfigProps

    open: (content: { content: ReactNode, config?: ConfigProps }) => void
    close: () => void
}

const defaultConfig: ConfigProps = {
    snapPoints: ["80%", "90%"],
    enablePanDownToClose: true,
    keyboardBehavior: "extend"
}

export const useBottomSheetStore = create<Props>((set) => ({
    isOpen: false,
    content: null,
    config: defaultConfig,
    open: ({ config, content }) => set({
        isOpen: true,
        config: { ...defaultConfig, ...config },
        content,
    }),
    close: () => set({
        isOpen: false,
        content: null,
        config: defaultConfig
    })
}))
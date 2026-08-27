import { useBottomSheetStore } from "@/shared/store/bottomsheet-store"
import { colors } from "@/styles/colors"
import GHBottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { Keyboard, Platform } from "react-native"

export const BottomSheet = () => {

    const { content, close, config, isOpen, open } = useBottomSheetStore()

    const bottomSheetRef = useRef<GHBottomSheet>(null)
    const indexBeforeKeyboard = useRef(0)
    const isKeyboardVisible = useRef(false)

    const snapPoints = useMemo(() => config?.snapPoints || ["80%", "90%"], [config?.snapPoints])

    useEffect(() => {
        if (isOpen && content) {
            indexBeforeKeyboard.current = 0
            bottomSheetRef.current?.snapToIndex(0)
        } else {
            bottomSheetRef.current?.close()
        }
    }, [isOpen, content])

    useEffect(() => {
        const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow"
        const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide"

        const showSubscription = Keyboard.addListener(showEvent, () => {
            isKeyboardVisible.current = true
        })

        const hideSubscription = Keyboard.addListener(hideEvent, () => {
            isKeyboardVisible.current = false
            if (!useBottomSheetStore.getState().isOpen) {
                return
            }

            bottomSheetRef.current?.snapToIndex(indexBeforeKeyboard.current)
        })

        return () => {
            showSubscription.remove()
            hideSubscription.remove()
        }
    }, [])

    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            close()
            return
        }
        if (!isKeyboardVisible.current) {
            indexBeforeKeyboard.current = index
        }
    }, [close])

    const handleBackdrop = useCallback((props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.7}
            pressBehavior={"close"}
        />)
        , []
    )

    return (
        <GHBottomSheet
            ref={bottomSheetRef}
            backdropComponent={handleBackdrop}
            backgroundStyle={{
                backgroundColor: colors.background,
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
            }}
            enablePanDownToClose={config.enablePanDownToClose ?? true}
            index={-1}
            animateOnMount
            snapPoints={snapPoints}
            keyboardBehavior={config.keyboardBehavior ?? "extend"}
            keyboardBlurBehavior="restore"
            android_keyboardInputMode="adjustResize"
            onChange={handleSheetChanges}
        >
            <BottomSheetScrollView keyboardShouldPersistTaps="handled">
                {content}
            </BottomSheetScrollView>
        </GHBottomSheet>
    )

}
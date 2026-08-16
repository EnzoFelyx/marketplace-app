import { useBottomSheetStore } from "@/shared/store/bottomsheet-store"
import { colors } from "@/styles/colors"
import GHBottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { useCallback, useEffect, useMemo, useRef } from "react"

export const BottomSheet = () => {

    const { content, close, config, isOpen, open } = useBottomSheetStore()

    const bottomSheetRef = useRef<GHBottomSheet>(null)

    const snapPoints = useMemo(() => config?.snapPoints || ["80%", "90%"], [config?.snapPoints])

    useEffect(() => {
        if (isOpen && content) {
            bottomSheetRef.current?.snapToIndex(0)
        } else {
            bottomSheetRef.current?.close()
        }
    }, [isOpen, content])

    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            close()
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
            onChange={handleSheetChanges}
        >
            <BottomSheetScrollView>
                {content}
            </BottomSheetScrollView>
        </GHBottomSheet>
    )

}
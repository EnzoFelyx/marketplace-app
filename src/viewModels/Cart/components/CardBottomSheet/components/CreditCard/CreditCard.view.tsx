import clsx from "clsx"
import { LinearGradient } from "expo-linear-gradient"
import { FC } from "react"
import { Text, View } from "react-native"
import Animated from "react-native-reanimated"
import { CardData } from "."
import { FocusedField } from "../../useCardBottomSheet.viewModel"
import { useCreditCardViewModel } from "./useCreditCard.viewModel"

const PURPLE_GRADIANT: readonly [string, string, string] = ["#5b3a8f", "#6b5ca5", "#7b6cb5"]

export const CreditCardView: FC<ReturnType<typeof useCreditCardViewModel> & { focusedField: FocusedField | null } & { CardData: CardData }> = ({
    focusedField,
    backAnimatedStyle,
    frontAnimatedStyle,
    CardData,
    formatCardNumber
}) => {

    return (
        <View className="h-[192px]">
            <Animated.View style={[
                frontAnimatedStyle, {
                    position: "absolute",
                    width: "100%",
                    height: 192,
                    backfaceVisibility: "hidden"
                }]}>
                <LinearGradient
                    colors={PURPLE_GRADIANT}
                    start={{ x: 0, y: 0.5 }}
                    style={{ flex: 1, borderRadius: 15, padding: 20 }}
                >
                    <View className="flex-row justify-between items-center mb-4">
                        <View className="w-12 h-8 rounded-md" style={{ backgroundColor: "#facc15" }} />
                    </View>

                    <View className={clsx("py-2 px-1 rounded-lg mb-6", {
                        "bg-white/20": focusedField === "number",
                    })}>
                        <Text className="text-white text-lg tracking-widest text-center">
                            {formatCardNumber(CardData.number)}
                        </Text>
                    </View>

                    <View className="flex-row justify-between items-end">
                        <View className={clsx("flex-1 py-2 px-2 rounded-lg", {
                            "bg-white/20": focusedField === "name"
                        })}>
                            <Text className="text-white text-sm font-bold uppercase">PORTADOR</Text>
                            <Text className="text-white text-sm font-bold uppercase">
                                {CardData.name.length ? CardData.name : "NOME DO TITULAR"}
                            </Text>
                        </View>


                        <View className={clsx("ml-4 py-1 px-1 rounded-lg", {
                            "bg-white/20": focusedField === "expiry"
                        })}>
                            <Text className="text-white text-xs mb-1 font-semibold">VALIDO ATÉ</Text>
                            <Text className="text-white text-sm font-bold">
                                {CardData.expiry.length ? CardData.expiry : "MM/AA"}
                            </Text>
                        </View>

                    </View>

                </LinearGradient>
            </Animated.View>

            <Animated.View style={[
                backAnimatedStyle, {
                    position: "absolute",
                    width: "100%",
                    height: 192,
                    backfaceVisibility: "hidden"
                }]}>
                <LinearGradient
                    colors={PURPLE_GRADIANT}
                    start={{ x: 0, y: 0.5 }}
                    style={{ flex: 1, borderRadius: 15 }}
                >
                    <View className="h-[40px] bg-black w-[100%] mt-[20px]" />

                    <View className="flex-1 justify-center items-end px-5">
                        <View className="w-24">
                            <Text className="text-white text-xs mb-2 font-semibold">CVV</Text>
                            <View className={clsx("p-2 rounded h-8 justify-center", {
                                "bg-white": focusedField !== 'cvv',
                                "bg-blue-light": focusedField === "cvv"
                            })}>
                                <Text>
                                    {CardData.cvv.length ? CardData.cvv : "..."}
                                </Text>
                            </View>
                        </View>
                    </View>

                </LinearGradient>
            </Animated.View>
        </View>
    )
}
import { ResolvedProductComment } from "@/shared/interface/product-comment"
import { useUserStore } from "@/shared/store/user-store"
import { colors } from "@/styles/colors"
import { Ionicons } from "@expo/vector-icons"
import { FC } from "react"
import { Image, Text, View } from "react-native"

interface Props {
    comment: ResolvedProductComment
}

export const CommentItem: FC<Props> = ({ comment }) => {

    const { user } = useUserStore()

    const isCurrentUser = Number(user?.id) === comment.user.id

    return (
        <View className="bg-white p-4 mb-3 rounded-lg shadow-sm">
            <View className="flex-row items-center justify-between mb-3">

                <View className="flex-row items-center flex-1">
                    <View className="w-8 h-8 rounded-[6px] overflow-hidden bg-gray-200 mg-3">
                        {comment.user.avatar.url && comment.user.avatar.url !== "" ? (
                            <Image
                                className="w-full h-full"
                                resizeMode="cover"
                                source={{ uri: comment.user.avatar.url }}
                            />
                        ) : (
                            <View className="w-full h-full items-center justify-center">
                                <Ionicons name="person" size={20} color={colors.gray[400]} />
                            </View>
                        )}
                    </View>

                    <View className="flex-row items-center flex-1 ml-2">
                        <Text className="text-base font-medium text-black">{comment.user.name}</Text>
                        {isCurrentUser && (
                            <View className="bg-blue-base px-2 py-1 rounded-full ml-2">
                                <Text className="text-white text-xs font-semibold">VOCÊ</Text>
                            </View>

                        )}
                    </View>
                </View>


                <View className="flex-row items-end">
                    <Ionicons name="star" size={16} color={colors["purple-base"]} />
                    <Text className="text-sm font-bold text-gray-500">
                        {comment.user.rating.value} / <Text className="text-[10px] text-gray-500">5</Text>
                    </Text>
                </View>
            </View>

            <Text>{comment.content}</Text>
        </View>
    )
}
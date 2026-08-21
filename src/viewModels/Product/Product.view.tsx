import { FC } from "react"
import { FlatList, Text, View } from "react-native"
import { useProductViewModel } from "./useProduct.viewModel"
import { SafeAreaView } from "react-native-safe-area-context"
import { Header } from "./components/Header"

export const ProductView: FC<ReturnType<typeof useProductViewModel>> = ({
    error,
    isLoading,
    productDetails,
    getCommentsErro,
    getCommentsLoading,
    comment,
    handleEndReached,
    handleLoadingMore,
    handleRefetch
}) => {

    if (error) {
        return <Text>Houve um erro ao carregar os detalhes do produto.</Text>
    }

    if (!productDetails) {
        return null
    }

    console.log(comment)

    return (
        <SafeAreaView className="flex-1 bg-background">
            <FlatList
                data={comment}
                renderItem={() => <></>}
                ListHeaderComponent={<Header productDetails={productDetails} />}
                className="px-6"
            />
        </SafeAreaView>
    )
}
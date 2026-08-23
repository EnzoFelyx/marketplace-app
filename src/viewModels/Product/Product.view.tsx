import { FC } from "react"
import { FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { CommentItem } from "./components/CommentItem"
import { EmptyList } from "./components/EmptyList"
import { Error } from "./components/Error"
import { Header } from "./components/Header"
import { ListFooter } from "./components/ListerFooter"
import { Loading } from "./components/Loading"
import { useProductViewModel } from "./useProduct.viewModel"
import { CartFooter } from "./components/CartFooter"

export const ProductView: FC<ReturnType<typeof useProductViewModel>> = ({
    error,
    isLoading,
    isFetchingNextPage,
    isRefetching,
    productDetails,
    getCommentsErro,
    getCommentsLoading,
    comment,
    handleEndReached,
    handleLoadingMore,
    handleRefetch
}) => {

    if (error) return <Error />

    if (isLoading || !productDetails) return <Loading />

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            <FlatList
                data={comment}
                renderItem={({ item }) => <CommentItem comment={item} />}
                ListHeaderComponent={<Header productDetails={productDetails} />}
                className="px-6"
                onRefresh={handleRefetch}
                refreshing={isRefetching}
                contentContainerClassName="pb-6"
                ListFooterComponent={<ListFooter isLoadingMore={isFetchingNextPage} />}
                ListEmptyComponent={<EmptyList isLoadingComments={getCommentsLoading} />}
                onEndReached={handleEndReached}
            />
            <CartFooter product={productDetails} />
        </SafeAreaView>
    )
}
import { colors } from "@/styles/colors"
import { FC } from "react"
import { FlatList, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Footer } from "./components/Footer"
import { ProductCard } from "./components/ProductCard"
import { RenderHeader } from "./components/RenderHeader"
import { useHomeViewModel } from "./useHome.viewModel"

export const HomeView: FC<ReturnType<typeof useHomeViewModel>> = ({
    products,
    handleEndReached,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    handleRefresh,
    isRefetching,
    setSearchInputText,
    searchInputText
}) => {

    return (
        <SafeAreaView className="flex-1" edges={["top"]}>
            <FlatList
                contentContainerClassName="px-[16px] pb-[120px]"
                data={products}
                numColumns={2}
                onEndReached={handleEndReached}
                removeClippedSubviews={false}
                columnWrapperStyle={{
                    justifyContent: "space-between",
                    alignItems: "flex-start"
                }}
                renderItem={({ item }) => <ProductCard product={item} />}
                ListFooterComponent={<Footer isLoading={hasNextPage && Boolean(isLoading || isFetchingNextPage)} />}
                keyExtractor={({ id }) => `product-list-item-${id}`}
                refreshControl={<RefreshControl
                    refreshing={isRefetching}
                    colors={[colors["purple-base"],]}
                    tintColor={colors["purple-base"]}
                    onRefresh={handleRefresh}
                />}
                ListHeaderComponent={<RenderHeader searchInputText={searchInputText} setSearchInputText={setSearchInputText} />}
            />
        </SafeAreaView>
    )
}
import { useUserStore } from "@/shared/store/user-store"
import { colors } from "@/styles/colors"
import { FC, memo } from "react"
import { FlatList, RefreshControl, Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Footer } from "./components/Footer"
import { HomeHeader } from "./components/Header"
import { ProductCard } from "./components/ProductCard"
import { SearchInput } from "./components/SearchInput"
import { useHomeViewModel } from "./useHome.viewModel"

const RenderHeader = memo(({
    searchInputText,
    setSearchInputText
}: {
    searchInputText: string,
    setSearchInputText: (text: string) => void
}
) => (
    <>
        <HomeHeader />
        <SearchInput
            setSearchInputText={setSearchInputText}
            inputValue={searchInputText}
        />
    </>
))

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

    const { logout } = useUserStore()

    return (
        <SafeAreaView className="flex-1" edges={["top"]}>
            <TouchableOpacity className="bg-danger" onPress={logout}>
                <Text>Logout</Text>
            </TouchableOpacity>
            <FlatList
                contentContainerClassName="px-[16px] pb-[120px]"
                data={products}
                numColumns={2}
                onEndReached={handleEndReached}
                columnWrapperStyle={{
                    justifyContent: "space-between"
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
import { useUserStore } from "@/shared/store/user-store"
import { FC } from "react"
import { FlatList, Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Footer } from "./components/Footer"
import { HomeHeader } from "./components/Header"
import { ProductCard } from "./components/ProductCard"
import { SearchInput } from "./components/SearchInput"
import { useHomeViewModel } from "./useHome.viewModel"

export const HomeView: FC<ReturnType<typeof useHomeViewModel>> = ({
    products,
    handleEndReached,
    isLoading,
    hasNextPage,
    isFetchingNextPage
}) => {

    const { logout } = useUserStore()

    console.log(hasNextPage, isLoading, isFetchingNextPage)

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
                ListHeaderComponent={() => (
                    <>
                        <HomeHeader />
                        <SearchInput />
                    </>
                )}
            />
        </SafeAreaView>
    )
}
import { FlatList, Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { HomeHeader } from "./components/Header"
import { useUserStore } from "@/shared/store/user-store"
import { SearchInput } from "./components/SearchInput"
import { ProductInterface } from "@/shared/interface/product"
import { ProductCard } from "./components/ProductCard"
import { FC } from "react"
import { useHomeViewModel } from "./useHome.viewModel"

export const HomeView: FC<ReturnType<typeof useHomeViewModel>> = ({products, handleEndReached}) => {

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
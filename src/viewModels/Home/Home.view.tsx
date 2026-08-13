import { FlatList, Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { HomeHeader } from "./components/Header"
import { useUserStore } from "@/shared/store/user-store"
import { SearchInput } from "./components/SearchInput"
import { ProductInterface } from "@/shared/interface/product"
import { ProductCard } from "./components/ProductCard"

export const HomeView = () => {

    const { logout } = useUserStore()

    const productsList: ProductInterface[] = [
        {
            id: 0,
            value: "string",
            name: "string",
            description: "string",
            photo: "string",
            height: "string",
            width: "string",
            weight: "string",
            averageRating: 0,
            views: 0,
            ratingCount: 0,
            categoryId: 0,
            category: {
                id: 0,
                name: "string"
            },
            createdAt: "string",
            updatedAt: "string",
            deletedAt: "string"
        }
    ]

    return (
        <SafeAreaView className="flex-1" edges={["top"]}>
            <TouchableOpacity className="bg-danger" onPress={logout}>
                <Text>Logout</Text>
            </TouchableOpacity>
            <FlatList
                contentContainerClassName="px-[16px] pb-[120px]"
                data={productsList}
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
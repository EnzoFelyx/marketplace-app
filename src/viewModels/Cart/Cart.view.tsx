import { FC } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartCard } from "./components/CartCard";
import { EmptyCart } from "./components/EmptyCart";
import { useCartViewModel } from "./useCart.viewModel";
import { CartHeader } from "./components/CartHeader";


export const CartView: FC<ReturnType<typeof useCartViewModel>> = ({ products }) => {


    return (
        <SafeAreaView className="flex-1" edges={["top"]}>
            <FlatList
                data={products}
                renderItem={({ item }) => <CartCard product={item} />}
                keyExtractor={({ id }) => `product-cart-id-${id}`}
                ListEmptyComponent={<EmptyCart />}
                ListHeaderComponent={<CartHeader />}
                contentContainerClassName="px-6"
            />
        </SafeAreaView>
    )
}
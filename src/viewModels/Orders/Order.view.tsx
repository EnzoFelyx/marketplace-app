import { FC } from "react"
import { FlatList, Text, View } from "react-native"
import { useOrdersViewModel } from "./useOrder.viewModel"
import { SafeAreaView } from "react-native-safe-area-context"
import { OrderItem } from "./components/OrderItem"
import { EmptyOrder } from "./components/EmptyOrder"
import { HeaderOrder } from "./components/HeaderOrder"

export const OrderView: FC<ReturnType<typeof useOrdersViewModel>> = ({
    orders
}) => {

    return (
        <SafeAreaView className="flex-1" edges={["top"]}>
            <FlatList
                contentContainerClassName="px-[16px] pb-[120px]"
                data={orders}
                renderItem={({ item: order }) => <OrderItem order={order} />}
                keyExtractor={({ id }) => `order-${id}`}
                ListHeaderComponent={HeaderOrder}
                ListEmptyComponent={EmptyOrder}
            />
        </SafeAreaView>
    )
}
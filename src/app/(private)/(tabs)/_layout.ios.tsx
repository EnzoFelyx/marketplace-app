import { colors } from "@/styles/colors";
import { NativeTabs } from "expo-router/unstable-native-tabs";

const { Trigger } = NativeTabs;

export default function TabLayout() {

    return <NativeTabs
        tintColor={colors["purple-base"]}
        minimizeBehavior="onScrollDown"
    >
        <Trigger name="home">
            <Trigger.Label>PRODUTOS</Trigger.Label>
            <Trigger.Icon sf={{ default: "storefront", selected: "storefront.fill" }} />
        </Trigger>

        <Trigger name="orders">
            <Trigger.Label>PEDIDOS</Trigger.Label>
            <Trigger.Icon sf={{ default: "list.clipboard", selected: "list.clipboard.fill" }} />
        </Trigger>

        <Trigger name="cart">
            <Trigger.Label>CARRINHO</Trigger.Label>
            <Trigger.Icon sf={{ default: "cart", selected: "cart.fill" }} />
        </Trigger>

    </NativeTabs>
}

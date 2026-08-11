import { useUserStore } from "@/shared/store/user-store";
import { Redirect, Stack } from "expo-router";

export default function PublicRoutes() {

    const { user, token } = useUserStore()

    if(user && token) {
        return <Redirect href={"/(private)/home"}/>
    }

    return (
        <Stack screenOptions={{
            headerShown: false
        }} />
    )
}
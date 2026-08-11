import { useUserStore } from "@/shared/store/user-store";
import { Redirect, Stack } from "expo-router";

export default function PrivateRoutes() {

     const { user, token } = useUserStore()
    
        if(!user || !token) {
            return <Redirect href={"/(public)/login"}/>
        }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        </Stack>
    )
}
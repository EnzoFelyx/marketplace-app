import { useUserStore } from "@/shared/store/user-store";
import { Redirect } from "expo-router";

export default function App() {

    const { user, token } = useUserStore()

    if (user && token) {
        return (
            <Redirect href="/(private)/home" />
        )
    }
    else
        return (
            <Redirect href="/(public)/login" />
        )
}
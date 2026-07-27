import { Redirect } from "expo-router";

export default function App() {

    const userData = {
        token: "asdjaisdj21ij312",
        name: "Enzofelyx"
    }

    if (!userData) {
        return (
            <Redirect href="/(private)/home" />
        )
    }
    else
        return (
            <Redirect href="/login" />
        )
}
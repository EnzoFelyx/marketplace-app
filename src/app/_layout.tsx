import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from "expo-router";
import '../styles/global.css';

const queryClient = new QueryClient()

export default function RootLayout() {

    return (
        <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="login" />
                <Stack.Screen name="register" />
                <Stack.Screen name="(private)" />
            </Stack>
        </QueryClientProvider>
    )
}
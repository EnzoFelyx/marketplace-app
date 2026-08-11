import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from "expo-router";
import '../styles/global.css';
import { Modal } from '@/components/Modal';
import ToastManeger from 'toastify-react-native'
import { useUserStore } from '@/shared/store/user-store';

const queryClient = new QueryClient()

export default function RootLayout() {

    const { token } = useUserStore()

    return (
        <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="(public)" />
                <Stack.Screen name="(private)" />
            </Stack>
            <Modal />
            <ToastManeger useModal={false} />
        </QueryClientProvider>
    )
}
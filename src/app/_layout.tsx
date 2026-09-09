import { Modal } from '@/components/Modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ToastManeger from 'toastify-react-native';
import '../styles/global.css';
import { useNotifications } from '@/shared/hooks/useNotifications';


const queryClient = new QueryClient()

export default function RootLayout() {

    useNotifications()

    return (
        <GestureHandlerRootView className='flex-1'>
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
        </GestureHandlerRootView>
    )
}
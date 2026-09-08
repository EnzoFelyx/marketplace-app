import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";
import { useUserStore } from "../store/user-store";

const getBaseUrl = () => {
    // Precisa ser acessado por dot notation para o Expo inlinar o valor no bundle.
    const url = process.env.EXPO_PUBLIC_API_URL

    if (!url) {
        throw new Error(
            "EXPO_PUBLIC_API_URL não definida. Copie .env.example para .env.local e informe o endereço da API."
        )
    }

    return url
}

export const baseURL = getBaseUrl()

export class MarketPlaceApiClient {

    private instance: AxiosInstance
    private isRefresing = false

    constructor() {
        this.instance = axios.create({
            baseURL,
        })
        this.setupInterceptors()
    }

    getInstance() {
        return this.instance
    }

    private setupInterceptors() {

        this.instance.interceptors.request.use(async (config) => {

            const userData = await AsyncStorage.getItem("marketplace-auth")

            if (userData) {
                const { state: {
                    token
                } } = JSON.parse(userData)

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                }
            }

            return config
        }, (error) => {
            return Promise.reject(error)
        })

        this.instance.interceptors.response.use((response) => response,
            async (error) => {

                const originalRequest = error.config

                if (error.response?.status === 401 && error.response?.data?.message === "Token expirado" && !this.isRefresing) {
                    this.isRefresing = true

                    try {
                        const userData = await AsyncStorage.getItem("marketplace-auth")

                        if (!userData) {
                            throw new Error("Usuário não autenticado")
                        }

                        const { state: { refreshToken } } = JSON.parse(userData)

                        if (!refreshToken) {
                            throw new Error("Refresh Token não encontrado")
                        }

                        const { data: response } = await this.instance.post("/auth/refresh", {
                            refreshToken
                        })

                        const currentUserData = JSON.parse(userData)

                        currentUserData.state.token = response.token
                        currentUserData.state.refresh = response.refreshToken

                        await AsyncStorage.setItem("marketplace-auth", JSON.stringify(currentUserData))

                        originalRequest.headers.Authorization = `Bearer${response.token}`

                        return this.instance(originalRequest)

                    } catch (error) {
                        this.handleUnauthorized()
                        return Promise.reject(new Error("Sessão encerrada, faça o login novamente"))
                    } finally {
                        this.isRefresing = false
                    }
                }

                if (error.response && error.response.data) {
                    return Promise.reject(new Error(error.response.data.message))
                } else {
                    return Promise.reject(new Error("Falha na autentificação"))
                }
            }
        )
    }

    private async handleUnauthorized() {

        const { logout } = useUserStore.getState()

        delete this.instance.defaults.headers.common["Authorization"]
        logout()

    }
}

export const marketPlaceApi = new MarketPlaceApiClient().getInstance()
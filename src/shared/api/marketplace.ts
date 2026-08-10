import axios, { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getBaseUrl = () => {
    // API roda em outro PC na mesma rede, então usamos o IP de LAN
    // para iOS e Android (físico ou emulador).
    return "http://192.168.0.236:3001"
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
            
            if(userData) {
                const {state: {
                    token
                } } = JSON.parse(userData)

                if(token){
                    config.headers.Authorization = `Bearer ${token}`
                }
            }

            return config
        }, (error) => {
            return Promise.reject(error)
        })
    }

}

export const marketPlaceApi = new MarketPlaceApiClient().getInstance()
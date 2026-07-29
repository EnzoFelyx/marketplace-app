import axios, { AxiosInstance } from "axios";

const getBaseUrl = () => {
    // API roda em outro PC na mesma rede, então usamos o IP de LAN
    // para iOS e Android (físico ou emulador).
    return "http://192.168.0.236:3001"
}

const baseURL = getBaseUrl()

export class MarketPlaceApiClient {

    private instance: AxiosInstance
    private isRefresing = false

    constructor() {
        this.instance = axios.create({
            baseURL,
        })
    }

    getInstance() {
        return this.instance
    }
}

export const marketPlaceApi = new MarketPlaceApiClient().getInstance()
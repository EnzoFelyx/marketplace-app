import { create } from "zustand"
import {persist, createJSONStorage} from "zustand/middleware"
import { UserInterface } from "../interface/user"
import AsyncStorage from "@react-native-async-storage/async-storage"

export interface UserStore {
    user: UserInterface | null
    token: string | null
    refreshToken: string | null
    setSession: (sessionData: SetSessionParams) => void
    logout: () => void
    updateTokens: (updateTokensData: UpdateTokensParams) => void
}

interface SetSessionParams {
    user: UserInterface,
    token: string,
    refreshToken: string
}

interface UpdateTokensParams {
    token: string,
    refreshToken: string
}

export const useUserStore = create<UserStore>()(persist((set) => ({
    user: null,
    token: null,
    refreshToken: null,

    logout: () => { },
    setSession: (sessionData) => set({ ...sessionData }),
    updateTokens: (updateTokensData) => set({ ...updateTokensData })
}), {
    name: "marketplace-auth",
    storage: createJSONStorage(() => AsyncStorage),
}))
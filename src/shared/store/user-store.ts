import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { UserInterface } from "../interface/user"

export interface UserStore {
    user: UserInterface | null
    token: string | null
    refreshToken: string | null
    setSession: (sessionData: SetSessionParams) => void
    logout: () => void
    updateTokens: (updateTokensData: UpdateTokensParams) => void
    updatedUser: (updatedUserData: Partial<UserInterface>) => void
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

    logout: () => set({
        user: null,
        token: null,
        refreshToken: null,
    }),
    setSession: (sessionData) => set({ ...sessionData }),
    updateTokens: (updateTokensData) => set({ ...updateTokensData }),
    updatedUser: (updatedUserData) =>
        set((state) => ({
            user: state.user ? { ...state.user, ...updatedUserData } : null
        }))
}), {
    name: "marketplace-auth",
    storage: createJSONStorage(() => AsyncStorage),
}))
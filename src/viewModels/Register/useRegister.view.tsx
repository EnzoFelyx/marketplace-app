import { useState } from "react"

export const useRegisterViewModal = () => {

    const [useData, setUserData] = useState({
        name: "Enzo",
    })

    return {
        useData,
        setUserData
    }
}
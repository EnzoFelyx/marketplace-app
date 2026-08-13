import { baseURL } from "../api/marketplace"

/**
 * A API devolve caminhos relativos ("/assets/images/avatars/x.jpeg").
 * O componente Image do React Native só carrega URL absoluta, então
 * resolvemos o caminho contra a baseURL antes de usar.
 */
export const resolveFileUrl = (path?: string | null) => {

    if (!path) {
        return null
    }

    // URI local do image picker ou URL já absoluta
    if (/^(https?:|file:|data:|content:|assets-library:|ph:)/.test(path)) {
        return path
    }

    return `${baseURL}${path.startsWith("/") ? "" : "/"}${path}`
}

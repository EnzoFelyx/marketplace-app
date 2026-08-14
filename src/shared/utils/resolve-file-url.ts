import { baseURL } from "../api/marketplace"

/**
 * A API devolve caminhos relativos ("/assets/images/avatars/x.jpeg") ou
 * URLs absolutas apontando para localhost. O componente Image do React Native
 * só carrega URL absoluta, e no device físico "localhost" é o próprio celular,
 * então resolvemos tudo contra a baseURL antes de usar.
 */
export const resolveFileUrl = (path?: string | null) => {

    if (!path) {
        return null
    }

    // URI local do image picker: usa como veio
    if (/^(file:|data:|content:|assets-library:|ph:)/.test(path)) {
        return path
    }

    // URL absoluta da API: só o caminho importa, o host vem da baseURL
    // (a API devolve "localhost", que no device físico é o próprio celular)
    if (/^https?:/.test(path)) {
        const { pathname, search } = new URL(path)
        return `${baseURL}${pathname}${search}`
    }

    return `${baseURL}${path.startsWith("/") ? "" : "/"}${path}`
}

/* export const BuildImageUrl = (originalUrl: string) => {
    if (Boolean(Constants.expoConfig?.extra?.isProduction)) {
        return originalUrl
    }
    return Platform.select({
        android: originalUrl.replace("localhost", "10.0.2.2"),
        ios: originalUrl
    })
} */

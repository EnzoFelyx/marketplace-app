import { baseURL } from "../api/marketplace"

const normalizeAssetPath = (pathname: string) =>
    pathname.replace(/^\/assets\/(?!images(?:\/|$))([^/]+)$/, "/assets/images/$1")

export const resolveFileUrl = (path?: string | null) => {

    if (!path) {
        return null
    }

    if (/^(file:|data:|content:|assets-library:|ph:)/.test(path)) {
        return path
    }

    if (/^https?:/.test(path)) {
        const { pathname, search } = new URL(path)
        return `${baseURL}${normalizeAssetPath(pathname)}${search}`
    }

    const pathname = path.startsWith("/") ? path : `/${path}`

    return `${baseURL}${normalizeAssetPath(pathname)}`
}

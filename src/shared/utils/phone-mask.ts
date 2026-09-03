export const unmaskPhone = (value: string) => value.replace(/\D/g, '').slice(0, 11)

export const phoneMask = (value: string) => {
    const cleaned = unmaskPhone(value)

    if (cleaned.length <= 2) return cleaned
    if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`

    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
}

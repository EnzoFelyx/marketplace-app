import { ProductInterface } from "@/shared/interface/product"

interface Props {
    product: ProductInterface
}

export const useProductCardViewModel = ({ product }: Props) => {

    const formatProductName = (name: string) => {
        if (name.length >= 17) {
            return `${name.slice(0, 22)}...`
        }
        return name
    }

    const displayName = formatProductName(product.name)

    const formatRating = product.averageRating.toFixed(1).replace(",",".")


    return {
        product,
        displayName,
        formatRating
    }
}
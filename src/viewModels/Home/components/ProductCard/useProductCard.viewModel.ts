import { ProductInterface } from "@/shared/interface/product"

interface Props {
    product: ProductInterface
}

export const useProductCardViewModel = ({ product }: Props) => {


    return {
        product
    }
}
import { CartProduct, OmittedProductCart } from "../store/cart-store";

export const cartService = {
    findExistingProduct: (productList: CartProduct[], productId: number) =>
        productList.some(({ id }) =>
            id === productId),

    addProductToCart: (productList: CartProduct[], newProduct: OmittedProductCart) => {
        const existingProduct = cartService.findExistingProduct(productList, newProduct.id)
        if (existingProduct) {
            return productList.map((product) => {
                if (product.id === newProduct.id) {
                    return { ...product, quantity: product.quantity + 1 }
                } else {
                    return product
                }
            })
        }
        return [...productList, { ...newProduct, quantity: 1 }]
    },

    calculateTotal: (productList: CartProduct[]) => {
        return productList.reduce((acc, product) => {
            return acc + (Number(product.price) * product.quantity)
        }, 0)
    }
}

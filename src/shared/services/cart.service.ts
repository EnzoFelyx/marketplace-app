import { CartProduct, OmittedProductCart } from "../store/cart-store";

export const cartService = {
    findExistingProduct: (productList: CartProduct[], productId: number) =>
        productList.some(({ id }) =>
            id === productId
        ),

    addProductToCart: (productList: CartProduct[], newProduct: OmittedProductCart) => {
        const existingProduct = cartService.findExistingProduct(productList, newProduct.id)
        if (existingProduct) {
            const products = productList.map((product) => {
                if (product.id === newProduct.id) {
                    return { ...product, quantity: product.quantity + 1 }
                } else {
                    return product
                }
            })
            const total = cartService.calculateTotal(products)

            return { products, total }
        }
        const products = [...productList, { ...newProduct, quantity: 1 }]
        const total = cartService.calculateTotal(products)
        return {
            products: products,
            total,
        }
    },

    calculateTotal: (productList: CartProduct[]) => {
        return productList.reduce((acc, product) => {
            return acc + (Number(product.price) * product.quantity)
        }, 0)
    },

    removeProductFromList: (productList: CartProduct[], productId: number) => {
        const products = productList.filter(({ id }) => id !== productId)
        const total = cartService.calculateTotal(products)
        return {
            products,
            total
        }
    },

    updateProductQuantity: ({
        productId,
        productList,
        quantity
    }: {
        productList: CartProduct[],
        productId: number,
        quantity: number
    }) => {
        if (quantity <= 0) {
            return cartService.removeProductFromList(productList, productId)
        }

        const products = productList.map((product) => {
            if (product.id === productId) {
                return { ...product, quantity }
            } else {
                return product
            }
        })
        const total = cartService.calculateTotal(products)

        return {
            products,
            total
        }
    },

    getItemCount: (productList: CartProduct[]) => productList.reduce((acc, product) => acc + product.quantity, 0)
}

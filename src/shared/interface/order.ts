export interface OrderInterface {
    id: number,
    productId: number,
    productName: string,
    productPhoto: string,
    quantity: number,
    totalPrice: number,
    createdAt: Date
    creditCard: {
        id: number,
        maskedNumber: string
    }
}
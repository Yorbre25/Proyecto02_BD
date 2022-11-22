interface Order { 
    id: number 
    total: number
    shippingAddress: string[]
    clientId: string
    delManId: string
    quantity: number[]
    productBarCode: number[]
}
export { Order }

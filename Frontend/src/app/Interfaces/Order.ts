interface Order {
    id: number
    total: number
    province: string
    city: string
    district: string
    clientId: number
    delManId: number
    storeId: number
    status: string
    clientName: string
    delManName: string
    clientLastName: string
    delManLastName: string
    quantity: number[]
    productBarCode: number[]
    productName: string[]
}
export { Order }

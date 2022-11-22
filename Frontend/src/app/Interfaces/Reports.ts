
interface SalePerClient {
  clientID: number
  clientName: string
  clientLastName1: string
  clientLastName2: string
  totalPurchases: number
  storeName: string
  delManName: string
  delManLastName1: string
  delManLastName2: string
  totalPrice: number
}

interface SalePerStore {
  storeID: number
  storeName: string
  totalSales: number
  totalPrice: number
}

export {
  SalePerClient,
  SalePerStore
}
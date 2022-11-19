interface Store {
  id: number
  name: string
  email: string
  province: string
  city: string
  district: string
  managerID: number
  storeTypeID: number
  storeTypeName: string
  phoneNumbers: string[]
}

interface StoreManager {
  id: number
  username: string
  name: string
  lastName1: string
  lastName2: string
  email: string
  province: string
  city: string
  district: string
  phoneNumbers: string[]
}

interface StoreData {
  store: Store
  manager: StoreManager
}

export {
  Store,
  StoreManager,
  StoreData
}
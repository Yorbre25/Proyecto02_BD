import { Manager } from "./Manager"
import { DeliveryMan } from "./DeliveryMan"
import { StoreType } from "./StoreType"
import { StoreData } from "./Store"
import { SalePerClient, SalePerStore } from "./Reports"

interface ServerResponse {
    status: 'ok' | 'error'
    message?: string
}

interface ManagersResponse extends ServerResponse {
    managers?: Manager[]
}

interface ManagerResponse extends ServerResponse {
    manager?: Manager
}

interface DeliveryMenResponse extends ServerResponse {
    deliveryMen?: DeliveryMan[]
}

interface DeliveryManResponse extends ServerResponse {
    deliveryMan?: DeliveryMan
}

interface StoreTypesResponse extends ServerResponse {
    storeTypes?: StoreType[]
}

interface StoreTypeResponse extends ServerResponse {
    storeType?: StoreType
}

interface StoresDataResponse extends ServerResponse {
    storesData: StoreData[]
}

interface StoreDataResponse extends ServerResponse {
    storeData: StoreData
}

interface SalePerClientResponse extends ServerResponse {
    report: SalePerClient[]
}

interface SalePerStoreResponse extends ServerResponse {
    report: SalePerStore[]
}

export {
    ServerResponse,
    ManagersResponse,
    ManagerResponse,
    DeliveryMenResponse,
    DeliveryManResponse,
    StoreTypesResponse,
    StoreTypeResponse,
    StoresDataResponse,
    StoreDataResponse,
    SalePerClientResponse,
    SalePerStoreResponse
}
import { Manager } from "./Manager"
import { DeliveryMan } from "./DeliveryMan"
import { StoreType } from "./StoreType"
import { StoreData } from "./Store"
import { SalePerClient, SalePerStore } from "./Reports"
import { Feedback } from "./Feedback"

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

interface FeedbackResponse extends ServerResponse {
    review: Feedback
}

interface FeedbacksResponse extends ServerResponse {
    reviews: Feedback[]
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
    SalePerStoreResponse,
    FeedbackResponse,
    FeedbacksResponse
}
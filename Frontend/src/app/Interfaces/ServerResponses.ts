import { Manager } from "./Manager"
import { DeliveryMan } from "./DeliveryMan"
import { StoreType } from "./StoreType"

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

export {
    ServerResponse,
    ManagersResponse,
    ManagerResponse,
    DeliveryMenResponse,
    DeliveryManResponse,
    StoreTypesResponse,
    StoreTypeResponse
}
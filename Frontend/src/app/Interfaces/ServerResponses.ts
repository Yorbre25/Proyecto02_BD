import { Manager } from "./Manager"
import { DeliveryMan } from "./DeliveryMan"
import { StoreType } from "./StoreType"
import { StoreData } from "./Store"
import { SalePerClient, SalePerStore } from "./Reports"
import { Product } from "./Product"
import { ProductCategory } from "./ProductCategory"

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

interface ProductsResponse extends ServerResponse {
    products: Product[]
}

interface ProductResponse extends ServerResponse {
    product: Product
}

interface SalePerClientResponse extends ServerResponse {
    report: SalePerClient[]
}

interface SalePerStoreResponse extends ServerResponse {
    report: SalePerStore[]
}

interface ProductCategoriesResponse extends ServerResponse {
    productCats: ProductCategory[]
}

interface ProductCategoryResponse extends ServerResponse {
    productCaty: ProductCategory
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
    ProductsResponse,
    ProductResponse,
    ProductCategoriesResponse,
    ProductCategoryResponse,
    SalePerClientResponse,
    SalePerStoreResponse
}
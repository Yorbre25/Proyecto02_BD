import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { apiURL } from '../app.component'

import {
  ProductsResponse,
  ProductResponse,
  ServerResponse,
} from '../Interfaces/ServerResponses'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = `${apiURL}/product`

  constructor(
    private httpClient: HttpClient,
  ) { }

  /**
   * Solicita al servidor que devuelva todos los productos
  */
  getAllProducts = (): Observable<ProductsResponse> =>
    this.httpClient.get<ProductsResponse>(`${this.url}/get_all`)

  /**
    * Solicita al servidor que devuelva todos los productos de una tienda
  */
  getAllStoreProducts = (storeID: number): Observable<ProductsResponse> =>
    this.httpClient.get<ProductsResponse>(`${this.url}/get_all_by_store/${storeID}`)

  /**
   * Solicita al servidor que devuelva la información de un producto
   * @param productID ID del producto
  */
  getProduct = (id: number): Observable<ProductResponse> =>
    this.httpClient.get<ProductResponse>(`${this.url}/get/${id}`)

  /**
   * Solicita al servidor que cree un nuevo producto
   * @param product Objeto con la información del producto
   * @returns Objeto con respuesta del servidor
  */
  createProduct = (product: any): Observable<ServerResponse> => {
    product.barCode = Number(product.barCode)
    product.price = Number(product.price)
    product.categoryId = Number(product.categoryId)
    product.storeId = Number(product.storeId)

    console.log(product)


    return this.httpClient.post<ServerResponse>(`${this.url}/add`, product)
  }

  /**
   * Solicita al servidor que actualice la información de un producto
   * @param productID ID del producto
   * @param product Objeto con la información del producto
   * @returns Objeto con respuesta del servidor
  */
  updateProduct = (productID: number, product: any): Observable<ServerResponse> => {
    return this.httpClient.patch<ServerResponse>(`${this.url}/update/${productID}`, product)
  }

  /**
   * Solicita al servidor que elimine un producto
   * @param id ID del producto
   * @returns Objeto con respuesta del servidor
  */
  deleteProduct = (id: number): Observable<ServerResponse> =>
    this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)
} 
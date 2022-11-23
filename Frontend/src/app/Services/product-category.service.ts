import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { apiURL } from '../app.component'

import {
  ProductCategoriesResponse,
  ProductCategoryResponse,
  ServerResponse,
} from '../Interfaces/ServerResponses'

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  url: string = `${apiURL}/product_category`

  constructor(
    private httpClient: HttpClient,
  ) { }

  /**
   * Solicita al servidor que devuelva todas las categorías
  */
  getAllProductCategories = (): Observable<ProductCategoriesResponse> =>
    this.httpClient.get<ProductCategoriesResponse>(`${this.url}/get_all`)

  /**
   * Solicita al servidor que devuelva la información de un categoría
   * @param categoryID ID del categoría
  */
  getProductCategory = (id: number): Observable<ProductCategoryResponse> =>
    this.httpClient.get<ProductCategoryResponse>(`${this.url}/get/${id}`)

  /**
   * Solicita al servidor que cree un nuevo categoría
   * @param category Objeto con la información del categoría
   * @returns Objeto con respuesta del servidor
  */
  createProductCategory = (category: any): Observable<ServerResponse> => {
    return this.httpClient.post<ServerResponse>(`${this.url}/add`, category)
  }

  /**
   * Solicita al servidor que actualice la información de un categoría
   * @param categoryID ID del categoría
   * @param category Objeto con la información del categoría
   * @returns Objeto con respuesta del servidor
  */
  updateProductCategory = (categoryID: number, category: any): Observable<ServerResponse> => {
    return this.httpClient.patch<ServerResponse>(`${this.url}/update/${categoryID}`, category)
  }

  /**
   * Solicita al servidor que elimine un categoría
   * @param id ID del categoría
   * @returns Objeto con respuesta del servidor
  */
  deleteProductCategory = (id: number): Observable<ServerResponse> =>
    this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)
} 
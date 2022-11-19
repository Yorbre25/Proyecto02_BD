import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { apiURL } from '../app.component'

import {
  StoreTypesResponse,
  StoreTypeResponse,
  ServerResponse,
} from '../Interfaces/ServerResponses'

import { AuxFunctionsService } from './aux-functions.service'

@Injectable({
  providedIn: 'root'
})
export class StoreTypeService {
  url: string = `${apiURL}/store_types`

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Solicita al servidor que devuelva todos los tipos de tienda
  */
  getAllStoreTypes = (): Observable<StoreTypesResponse> =>
    this.httpClient.get<StoreTypesResponse>(`${this.url}/get_all`)

  /**
   * Solicita al servidor que devuelva la información de un tipo de tienda
   * @param storeTypeID ID del tipo de tienda
  */
  getStoreType = (id: number): Observable<StoreTypeResponse> =>
    this.httpClient.get<StoreTypeResponse>(`${this.url}/get/${id}`)

  /**
   * Solicita al servidor que cree un nuevo tipo de tienda
   * @param storeType Objeto con la información del tipo de tienda
   * @returns Objeto con respuesta del servidor
  */
  createStoreType = (storeType: any): Observable<ServerResponse> => {
    return this.httpClient.post<ServerResponse>(`${this.url}/add`, storeType)
  }

  /**
   * Solicita al servidor que actualice la información de un tipo de tienda
   * @param storeTypeID ID del tipo de tienda
   * @param storeType Objeto con la información del tipo de tienda
   * @returns Objeto con respuesta del servidor
  */
  updateStoreType = (storeTypeID: number, storeType: any): Observable<ServerResponse> => {
    return this.httpClient.patch<ServerResponse>(`${this.url}/update/${storeTypeID}`, storeType)
  }

  /**
   * Solicita al servidor que elimine un tipo de tienda
   * @param id ID del tipo de tienda
   * @returns Objeto con respuesta del servidor
  */
  deleteStoreType = (id: number): Observable<ServerResponse> =>
    this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)
} 
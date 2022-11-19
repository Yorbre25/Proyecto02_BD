import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { apiURL } from '../app.component'

import {
  StoresDataResponse,
  StoreDataResponse,
  ServerResponse,
} from '../Interfaces/ServerResponses'

import { AuxFunctionsService } from './aux-functions.service'

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  url: string = `${apiURL}/stores`

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Solicita al servidor que devuelva todos los afiliados
  */
  getAllStoresData = (): Observable<StoresDataResponse> =>
    this.httpClient.get<StoresDataResponse>(`${this.url}/get_all`)

  /**
   * Solicita al servidor que devuelva la información de un afiliados
   * @param storeID ID del afiliados
  */
  getStore = (id: number): Observable<StoreDataResponse> =>
    this.httpClient.get<StoreDataResponse>(`${this.url}/get/${id}`)

  /**
   * Solicita al servidor que cree un nuevo afiliados
   * @param store Objeto con la información del afiliados
   * @returns Objeto con respuesta del servidor
  */
  createStore = (store: any): Observable<ServerResponse> => {
    store.phoneNumbers
      .forEach((phoneNumber: number) => phoneNumber.toString())

    return this.httpClient.post<ServerResponse>(`${this.url}/add`, store)
  }

  /**
   * Solicita al servidor que actualice la información de un afiliados
   * @param storeID ID del afiliados
   * @param store Objeto con la información del afiliados
   * @returns Objeto con respuesta del servidor
  */
  updateStore = (storeID: number, store: any): Observable<ServerResponse> => {
    store.phoneNumbers
      .forEach((phoneNumber: number) => phoneNumber.toString())

    return this.httpClient.patch<ServerResponse>(`${this.url}/update/${storeID}`, store)
  }

  /**
   * Solicita al servidor que elimine un afiliados
   * @param id ID del afiliados
   * @returns Objeto con respuesta del servidor
  */
  deleteStore = (id: number): Observable<ServerResponse> =>
    this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)
} 
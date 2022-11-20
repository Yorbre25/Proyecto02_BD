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
  createStore = (storeData: any): Observable<ServerResponse> => {
    storeData.store.phoneNumbers
      .forEach((phoneNumber: number) => phoneNumber.toString())

    storeData.manager.phoneNumbers
      .forEach((phoneNumber: number) => phoneNumber.toString())

    storeData.store.managerID = storeData.manager.id
    storeData.store.storeTypeID = Number(storeData.store.storeTypeID)

    return this.httpClient.post<ServerResponse>(`${this.url}/add`, storeData)
  }

  /**
   * Solicita al servidor que actualice la información de un afiliados
   * @param storeID ID del afiliados
   * @param store Objeto con la información del afiliados
   * @returns Objeto con respuesta del servidor
  */
  updateStore = (storeID: number, storeData: any): Observable<ServerResponse> => {
    storeData.store.phoneNumbers
      .forEach((phoneNumber: number) => phoneNumber.toString())

    storeData.manager.phoneNumbers
      .forEach((phoneNumber: number) => phoneNumber.toString())

    storeData.store.managerID = storeData.manager.id
    storeData.store.storeTypeID = Number(storeData.store.storeTypeID)

    console.log(storeData);

    return this.httpClient.patch<ServerResponse>(`${this.url}/update/${storeID}`, storeData)
  }

  /**
   * Solicita al servidor que elimine un afiliados
   * @param id ID del afiliados
   * @returns Objeto con respuesta del servidor
  */
  deleteStore = (id: number): Observable<ServerResponse> =>
    this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)
} 
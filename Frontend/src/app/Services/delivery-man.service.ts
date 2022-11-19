import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { apiURL } from '../app.component'

import {
  DeliveryMenResponse,
  DeliveryManResponse,
  ServerResponse,
} from '../Interfaces/ServerResponses'

import { AuxFunctionsService } from './aux-functions.service'

@Injectable({
  providedIn: 'root'
})
export class DeliveryManService {
  url: string = `${apiURL}/delivery_man`

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Solicita al servidor que devuelva todos los repartidores
  */
  getAllDeliveryMen = (): Observable<DeliveryMenResponse> =>
    this.httpClient.get<DeliveryMenResponse>(`${this.url}/get_all`)

  /**
   * Solicita al servidor que devuelva la información de un repartidor
   * @param deliveryManID ID del repartidor
  */
  getDeliveryMan = (id: number): Observable<DeliveryManResponse> =>
    this.httpClient.get<DeliveryManResponse>(`${this.url}/get/${id}`)

  /**
   * Solicita al servidor que cree un nuevo repartidor
   * @param deliveryMan Objeto con la información del repartidor
   * @returns Objeto con respuesta del servidor
  */
  createDeliveryMan = (deliveryMan: any): Observable<ServerResponse> => {
    deliveryMan.phoneNumbers
      .forEach((phoneNumber: number) => phoneNumber.toString())

    return this.httpClient.post<ServerResponse>(`${this.url}/add`, deliveryMan)
  }

  /**
   * Solicita al servidor que actualice la información de un repartidor
   * @param deliveryManID ID del repartidor
   * @param deliveryMan Objeto con la información del repartidor
   * @returns Objeto con respuesta del servidor
  */
  updateDeliveryMan = (deliveryManID: number, deliveryMan: any): Observable<ServerResponse> => {
    deliveryMan.phoneNumbers
      .forEach((phoneNumber: number) => phoneNumber.toString())

    return this.httpClient.patch<ServerResponse>(`${this.url}/update/${deliveryManID}`, deliveryMan)
  }

  /**
   * Solicita al servidor que elimine un repartidor
   * @param id ID del repartidor
   * @returns Objeto con respuesta del servidor
  */
  deleteDeliveryMan = (id: number): Observable<ServerResponse> =>
    this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)
} 
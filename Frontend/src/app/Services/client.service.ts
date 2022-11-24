import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { apiURL } from '../app.component'

import {
  ClientsResponse,
  ClientResponse,
  ServerResponse,
} from '../Interfaces/ServerResponses'

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url: string = `${apiURL}/admin`

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Solicita al servidor que devuelva todos los clientes
  */
  getAllClients = (): Observable<ClientsResponse> =>
    this.httpClient.get<ClientsResponse>(`${this.url}/get_all`)

  /**
   * Solicita al servidor que devuelva la información de un cliente
   * @param clientID ID del cliente
  */
  getClient = (id: number): Observable<ClientResponse> =>
    this.httpClient.get<ClientResponse>(`${this.url}/get/${id}`)

  /**
   * Solicita al servidor que cree un nuevo cliente
   * @param client Objeto con la información del cliente
   * @returns Objeto con respuesta del servidor
  */
  createClient = (client: any): Observable<ServerResponse> => {
    return this.httpClient.post<ServerResponse>(`${this.url}/add`, client)
  }

  /**
   * Solicita al servidor que actualice la información de un cliente
   * @param clientID ID del cliente
   * @param client Objeto con la información del cliente
   * @returns Objeto con respuesta del servidor
  */
  updateClient = (clientID: number, client: any): Observable<ServerResponse> => {
    return this.httpClient.patch<ServerResponse>(`${this.url}/update/${clientID}`, client)
  }

  /**
   * Solicita al servidor que elimine un cliente
   * @param id ID del cliente
   * @returns Objeto con respuesta del servidor
  */
  deleteClient = (id: number): Observable<ServerResponse> =>
    this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)
} 
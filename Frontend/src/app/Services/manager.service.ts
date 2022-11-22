import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { apiURL } from '../app.component'

import {
  ManagersResponse,
  ManagerResponse,
  ServerResponse,
} from '../Interfaces/ServerResponses'

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  url: string = `${apiURL}/admin`

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Solicita al servidor que devuelva todos los empleados
  */
  getAllManagers = (): Observable<ManagersResponse> =>
    this.httpClient.get<ManagersResponse>(`${this.url}/get_all`)

  /**
   * Solicita al servidor que devuelva la información de un empleado
   * @param managerID ID del empleado
  */
  getManager = (id: number): Observable<ManagerResponse> =>
    this.httpClient.get<ManagerResponse>(`${this.url}/get/${id}`)

  /**
   * Solicita al servidor que cree un nuevo empleado
   * @param manager Objeto con la información del empleado
   * @returns Objeto con respuesta del servidor
  */
  createManager = (manager: any): Observable<ServerResponse> => {
    manager.phoneNumbers
      .forEach((phoneNumber: number) => phoneNumber.toString())

    return this.httpClient.post<ServerResponse>(`${this.url}/add`, manager)
  }

  /**
   * Solicita al servidor que actualice la información de un empleado
   * @param managerID ID del empleado
   * @param manager Objeto con la información del empleado
   * @returns Objeto con respuesta del servidor
  */
  updateManager = (managerID: number, manager: any): Observable<ServerResponse> => {
    manager.phoneNumbers
      .forEach((phoneNumber: number) => phoneNumber.toString())

    return this.httpClient.patch<ServerResponse>(`${this.url}/update/${managerID}`, manager)
  }

  /**
   * Solicita al servidor que elimine un empleado
   * @param id ID del empleado
   * @returns Objeto con respuesta del servidor
  */
  deleteManager = (id: number): Observable<ServerResponse> =>
    this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)
} 
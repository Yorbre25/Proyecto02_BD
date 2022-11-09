import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { apiURL } from '../app.component'

import {
  ManagersResponse,
  ManagerResponse,
  ServerResponse,
} from '../Interfaces/ServerResponses'

import { AuxFunctionsService } from './aux-functions.service'

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  url: string = `${apiURL}/admin`

  constructor(
    private httpClient: HttpClient,
    private auxFunctionsService: AuxFunctionsService
  ) { }

  /**
   * Solicita al servidor que devuelva todos los empleados
  */
  getAllManagers = (): Observable<ManagersResponse> =>
    this.httpClient.get<ManagersResponse>(`${this.url}/get_all`)

  /**
   * Solicita al servidor que devuelva la información de un empleado
   * @param employeeID ID del empleado
  */
  getManager = (id: number): Observable<ManagerResponse> =>
    this.httpClient.get<ManagerResponse>(`${this.url}/get/${id}`)

  // /**
  //  * Solicita al servidor que cree un nuevo empleado
  //  * @param employee Objeto con la información del empleado
  //  * @returns Objeto con respuesta del servidor
  // */
  // createManager = (employee: any): Observable<ServerResponse> => {
  //   employee.id = employee.id.toString()
  //   employee.fechaNacimiento = this.auxFunctionsService
  //     .dateToString(employee.fechaNacimiento)
  //   employee.fechaInicio = this.auxFunctionsService
  //     .dateToString(employee.fechaInicio)

  //   employee.password = employee.password.toString();

  //   return this.httpClient.post<ServerResponse>(`${this.url}/add`, employee)
  // }

  // /**
  //  * Solicita al servidor que actualice la información de un empleado
  //  * @param employeeID ID del empleado
  //  * @param employee Objeto con la información del empleado
  //  * @returns Objeto con respuesta del servidor
  // */
  // updateManager = (employeeID: number, employee: any): Observable<ServerResponse> => {
  //   employee.id = employee.id.toString()

  //   employee.fechaNacimiento = this.auxFunctionsService
  //     .dateToString(employee.fechaNacimiento)

  //   employee.fechaInicio = this.auxFunctionsService
  //     .dateToString(employee.fechaInicio)

  //   employee.password = employee.password.toString();

  //   return this.httpClient.patch<ServerResponse>(`${this.url}/update/${employeeID}`, employee)
  // }

  /**
   * Solicita al servidor que elimine un empleado
   * @param id ID del empleado
   * @returns Objeto con respuesta del servidor
  */
  deleteManager = (id: number): Observable<ServerResponse> =>
    this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)
} 
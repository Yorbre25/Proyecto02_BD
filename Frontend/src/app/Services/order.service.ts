import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { apiURL } from '../app.component'
import { Order } from '../Interfaces/Order';
import { OrdersResponse, ServerResponse } from '../Interfaces/ServerResponses';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url: string = `${apiURL}/order`

  constructor(
    private httpClient: HttpClient,
  ) { }

  /**
 * Solicita al servidor que devuelva todas las ordenes
*/
  getAllOrders = (): Observable<OrdersResponse> =>
    this.httpClient.get<OrdersResponse>(`${this.url}/get_all`)

      /**
 * Solicita al servidor que devuelva todas las ordenes de un cliente
*/
  getAllOrdersCli = (): Observable<OrdersResponse> =>
    this.httpClient.get<OrdersResponse>(`${this.url}/get_all_cli`)

    
      /**
   * Solicita al servidor que actualice la información de repartidor de orden
   * @param order orden
  */

  setDeliveryMan = (order: Order): Observable<ServerResponse> =>
    this.httpClient.post<ServerResponse>(`${this.url}/set_deliveryman`, order)


      /**
   * Solicita al servidor que actualice la información de un orden
   * @param managerID ID del orden
   * @param manager Objeto con la información del orden
   * @returns Objeto con respuesta del servidor
  */
  updateOrder = (orderID: number, order: any): Observable<ServerResponse> => {
    order.quantity
      .forEach((quantity: number) => quantity.toString())

    order.productBarCode
      .forEach((productBarCode: number) => productBarCode.toString())

    order.productName
      .forEach((productName: string) => productName.toString())

    return this.httpClient.patch<ServerResponse>(`${this.url}/update/${orderID}`, order)
  }

  /**
   * Solicita al servidor que cree un nuevo orden
   * @param manager Objeto con la información del orden
   * @returns Objeto con respuesta del servidor
  */
  addOrder = (order:any): Observable<ServerResponse> =>
    this.httpClient.post<ServerResponse>(`${this.url}/add`, order)

    /**
   *Actualiza la orden cuando ha sido recibida por el usuario
  */
  setDelivered = (orderID:number):  Observable<ServerResponse> =>
    this.httpClient.get<ServerResponse>(`${this.url}/setdelivered/${orderID}`)
}



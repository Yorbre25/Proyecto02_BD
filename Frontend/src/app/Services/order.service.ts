import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { apiURL } from '../app.component'
import { OrdersResponse } from '../Interfaces/ServerResponses';

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
}

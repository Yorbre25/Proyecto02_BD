import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { apiURL } from '../app.component';

import {
  SalePerClientResponse,
  SalePerStoreResponse
} from '../Interfaces/ServerResponses';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  url: string = `${apiURL}/reports`

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
    * Solicita al servidor que devuelva el reporte de ventas por cliente
  */
  getSalesPerClient = (): Promise<SalePerClientResponse> => {
    return new Promise((resolve, reject) => {
      this.httpClient.get<SalePerClientResponse>(`${this.url}/sales_per_client`)
        .subscribe((response) => resolve(response))
    })
  }

  /**
    * Solicita al servidor que devuelva el reporte de ventas por tienda
  */
  getSalesPerStore = (): Promise<SalePerStoreResponse> => {
    return new Promise((resolve, reject) => {
      this.httpClient.get<SalePerStoreResponse>(`${this.url}/sales_per_store`)
        .subscribe((response) => resolve(response))
    })
  }
}

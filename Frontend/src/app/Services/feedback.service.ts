import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { apiURL } from '../app.component'

import {
  FeedbackResponse,
  FeedbacksResponse,
  ServerResponse,
} from '../Interfaces/ServerResponses'

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  url: string = `${apiURL}/feedback`

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Solicita al servidor que devuelva todos las reseñas
  */
  getAllFeedbacks = (id:number): Observable<FeedbacksResponse> =>
    this.httpClient.get<FeedbacksResponse>(`${this.url}/get_all/${id}`)

  /**
   * Solicita al servidor que devuelva la información de una reseña de un cliente
   * @param id ID de la reseña
  */
  getFeedback = (id: number): Observable<FeedbackResponse> =>
    this.httpClient.get<FeedbackResponse>(`${this.url}/get/${id}`)

  /**
   * Solicita al servidor que cree una reseña
   * @param feedback Objeto con la información del feedback
   * @returns Objeto con respuesta del servidor
  */
  createFeedback = (feedback: any): Observable<ServerResponse> => {

    return this.httpClient.post<ServerResponse>(`${this.url}/add`, feedback)
  }

  /**
   * Solicita al servidor que elimine una reseña
   * @param id ID de la reseña
   * @returns Objeto con respuesta del servidor
  */
  deleteFeedback = (id: number): Observable<ServerResponse> =>
    this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)
} 
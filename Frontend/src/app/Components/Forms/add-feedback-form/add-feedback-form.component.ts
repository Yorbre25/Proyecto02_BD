import { Component, OnInit } from '@angular/core';
import Cookies from 'js-cookie';
import { Feedback } from 'src/app/Interfaces/Feedback';
import { ServerResponse } from 'src/app/Interfaces/ServerResponses';
import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';
import { FeedbackService } from 'src/app/Services/feedback.service';
import { FormsService } from 'src/app/Services/forms.service';
import { OrderService } from 'src/app/Services/order.service';
import { Order } from 'src/app/Interfaces/Order';

@Component({
  selector: 'app-add-feedback-form',
  templateUrl: './add-feedback-form.component.html',
  styleUrls: ['./add-feedback-form.component.scss']
})
export class AddFeedbackFormComponent implements OnInit {

  constructor(private orderService: OrderService,
    private feedbackService: FeedbackService, 
    protected formsService: FormsService,
    private auxFunctionsService: AuxFunctionsService
    ) { 
    
  }

  ngOnInit(): void {
    let idOrderEnd
    this.orderService.getAllOrders()
      .subscribe(response => {
        if (response.status === 'error') {
          alert(response.message)
        }
        else if (response.orders) {
          const storeOrders = response.orders.filter(order => 
            order.status === 'En camino').filter(order => order.clientId === Number(Cookies.get('idClient')))
          storeOrders.forEach((order) => {
            idOrderEnd = order.id
          })
        }
        else {
          console.log(response)
        }
      })

    this.orderService.setDelivered(Number(idOrderEnd)).subscribe(response => {
      if (response.status === 'error') {
        alert(response.message)
      }})
  }

  
  onSubmit = async () => {
    const newFeedbackInfo = this.formsService.getFormValue()
    await this.createFeedback(newFeedbackInfo)
      .then((response) => {
        this.auxFunctionsService.handleResponse(response)
      })
  }

  createFeedback = (newFeedbackInfo: Feedback): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      this.feedbackService.createFeedback(newFeedbackInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }

}

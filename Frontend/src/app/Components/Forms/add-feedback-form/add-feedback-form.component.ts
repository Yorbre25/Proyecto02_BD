import { Component, OnInit } from '@angular/core';
import Cookies from 'js-cookie';
import { Feedback } from 'src/app/Interfaces/Feedback';
import { ServerResponse } from 'src/app/Interfaces/ServerResponses';
import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';
import { FeedbackService } from 'src/app/Services/feedback.service';
import { FormsService } from 'src/app/Services/forms.service';
import { OrderService } from 'src/app/Services/order.service';
import { Order } from 'src/app/Interfaces/Order';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-feedback-form',
  templateUrl: './add-feedback-form.component.html',
  styleUrls: ['./add-feedback-form.component.scss']
})
export class AddFeedbackFormComponent implements OnInit {
  idOrderEnd:number
  idClient:number
  reviewDelman: FormControl
  reviewStore: FormControl
  constructor(private orderService: OrderService,
    private feedbackService: FeedbackService, 
    protected formsService: FormsService,
    private auxFunctionsService: AuxFunctionsService
    ) { 
      this.reviewDelman = new FormControl('', [Validators.required])
      this.reviewStore = new FormControl('', [Validators.required])
      this.idOrderEnd = 45;
      this.idClient = Number(Cookies.get('idClient'))
  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('reviewDelman', this.reviewDelman)
    this.formsService.form.addControl('reviewStore', this.reviewStore)

    this.orderService.getAllOrders()
      .subscribe(response => {
        if (response.status === 'error') {
          alert(response.message)
        }
        else if (response.orders) {
          const storeOrders = response.orders.filter(order => 
            order.status === 'En camino').filter(order => order.clientId === Number(Cookies.get('idClient')))
          storeOrders.forEach((order) => {
            this.idOrderEnd = order.id
          })
        }
        else {
          console.log(response)
        }
      })

    this.orderService.setDelivered(this.idOrderEnd).subscribe(response => {
      if (response.status === 'error') {
        alert(response.message)
      }})
  }

  
  onSubmit = async () => {
    console.log("Llegue aqui")
    const newFeedbackInfo = this.formsService.getFormValue()
    let feedbackSend:any = {
      'idOrder':this.idOrderEnd, 'idClient':this.idClient
      ,'storeReview':newFeedbackInfo.reviewStore,
      'delmanReview':newFeedbackInfo.reviewDelman
      }
    console.log(feedbackSend)
    await this.createFeedback(feedbackSend)
      .then((response) => {
        this.auxFunctionsService.handleResponse(response)
      })
      window.location.href = 'client/menu'
  }

  createFeedback = (newFeedbackInfo: any): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      this.feedbackService.createFeedback(newFeedbackInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }

}

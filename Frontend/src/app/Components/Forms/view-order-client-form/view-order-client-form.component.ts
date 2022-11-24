import { Component, OnInit } from '@angular/core';
import Cookies from 'js-cookie';
import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';
import { ClientService } from 'src/app/Services/client.service';
import { OrderService } from 'src/app/Services/order.service';
import { ServerResponse } from 'src/app/Interfaces/ServerResponses';

@Component({
  selector: 'app-view-order-client-form',
  templateUrl: './view-order-client-form.component.html',
  styleUrls: ['./view-order-client-form.component.scss']
})
export class ViewOrderClientFormComponent implements OnInit {
  subtotal:number=0
  total:number=0
  servicio:number=0
  constructor(private orderService:OrderService,
    private clientService:ClientService,
    protected auxFunctionsService:AuxFunctionsService) { 
   }

  ngOnInit(): void {
    this.subtotal = Number(Cookies.get('subtotal'))
    this.total = Number(Cookies.get('total'))
    this.servicio = Number(Cookies.get('service'))
  }

  onSubmit = async ()=>{

    console.log("Almacenando pedido")

    let clientid = Cookies.get('idClient')
    let province:string = ""
    let city:string = ""
    let district:string = ""
    this.clientService.getClient(Number(clientid)).subscribe(response => {
      if (response.status === 'error') {
        alert(response.message)
      }
      else{
        province = response.client?.province!
        city = response.client?.city!
        district = response.client?.district!
      }
    })
    let storeID = Cookies.get('storeId')
    let barCodes = JSON.parse(String(Cookies.get('cartProductIds'))).productIDs
    let quantities = JSON.parse(String(Cookies.get('cartProductQuants'))).productQuants
    
    let order:any = {'province':province, 'city':city, 'district':district,
                'clientId':Number(clientid), 'storeId':Number(storeID),
                 'productBarCode':barCodes, 'quantity':quantities}

    Cookies.set('check', JSON.stringify(order))
    
    await this.addOrder(order)
      .then((response) => {
        console.log(response.message)
        Cookies.set('check2', response.message!)
        this.auxFunctionsService.handleResponse(response)
      })

      window.location.href = 'client/order'
    }
  

  addOrder = (newOrder: any): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      this.orderService.addOrder(newOrder)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }
}

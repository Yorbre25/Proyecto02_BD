import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';
import { StoreType } from 'src/app/Interfaces/StoreType';

import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';
import { StoreTypeService } from 'src/app/Services/store-type.service';

@Component({
  selector: 'app-store-type-info',
  templateUrl: './store-type-info.component.html',
  styleUrls: ['./store-type-info.component.scss']
})
export class StoreTypeInfoComponent implements OnInit {
  storeTypeInfoTitles: KeyReplacement<StoreType>[]
  storeType: StoreType

  constructor(
    private route: ActivatedRoute,
    private storeTypeService: StoreTypeService,
    protected auxFunctionsService: AuxFunctionsService
  ) {
    this.storeTypeInfoTitles = [
      { key: "id", replacement: "Identificación" },
      { key: "name", replacement: "Tipo de comercio" }
    ]

    this.storeType = {} as StoreType
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.storeTypeService.getStoreType(id)
      .subscribe(response => {
        if (response.status === 'error') {
          alert(response.message)
        }
        else if (response.storeType) {
          this.storeType = response.storeType
        }
        else {
          console.log(response)
        }
      })
  }

  deleteStoreType = (): void => {
    this.storeTypeService.deleteStoreType(this.storeType.id)
      .subscribe(response => {
        if (response.status === 'error') {
          alert(response.message)
        }
        else {
          window.location.href = '/manager/store_types'
        }
      })
  }
}

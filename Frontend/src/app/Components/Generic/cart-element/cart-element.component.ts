import { Component, Input, OnInit } from '@angular/core'
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'

@Component({
  selector: 'app-table',
  templateUrl: './cart-element.component.html',
  styleUrls: ['./cart-element.component.scss',
  ]
})
export class TableComponent<Type> implements OnInit {
  @Input() tableColumns: KeyReplacement<Type>[]
  @Input() tableData: Type[]
  @Input() rowIDKey: keyof Type
  @Input() onClick?: (rowID: number) => void

  constructor() {
    this.tableColumns = []
    this.tableData = []
    this.rowIDKey = "" as keyof Type
  }

  ngOnInit(): void { }

}

import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormControl, Validators } from '@angular/forms'

import { FormsService } from 'src/app/Services/forms.service'

@Component({
  selector: 'app-multivalued-input',
  templateUrl: './multivalued-input.component.html',
  styleUrls: ['./multivalued-input.component.scss']
})
export class MultivaluedInputComponent implements OnInit {
  @Input() label: string
  @Input() inputType: string
  @Input() formArray: FormArray

  constructor(protected formsService: FormsService) {
    this.label = ''
    this.inputType = 'text'

    this.formArray = new FormArray([], [Validators.required]) as any
  }

  ngOnInit(): void { }

  addElement = () => { this.formArray.push(new FormControl('')) }

  deleteElement = (index: number) => {
    if (this.formArray.length > 1) {
      this.formArray.removeAt(index)
    }
  }
}

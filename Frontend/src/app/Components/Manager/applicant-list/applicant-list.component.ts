import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'
import { Store } from 'src/app/Interfaces/Store'

import { FormsService } from 'src/app/Services/forms.service'
import { StoreService } from 'src/app/Services/store.service'

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.scss']
})
export class ApplicantListComponent implements OnInit {
  @ViewChild('content', { static: true }) content?: TemplateRef<any>

  tableColumns: KeyReplacement<Store>[]
  tableData: Store[]

  selectedApplicantID: number
  selectedApplicantName: string

  observation: FormControl

  constructor(
    private modalService: NgbModal,
    private storeService: StoreService,
    protected formsService: FormsService
  ) {
    this.tableColumns = [
      { key: "name", replacement: "Nombre del comercio" },
      { key: "email", replacement: "Correo electrónico" },
      { key: "storeTypeName", replacement: "Tipo de comercio" },
      { key: "managerID", replacement: "Nombre del gerente" }
    ]

    this.tableData = []

    this.selectedApplicantID = -1
    this.selectedApplicantName = ''

    this.observation = new FormControl('')
  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('observation', this.observation)

    this.storeService.getAllApplicants()
      .subscribe(response => {
        if (response.status === 'error') {
          alert(response.message)
        }
        else if (response.storesData) {
          const stores: Store[] = response.storesData
            .map((storeData) => {
              let store: any = storeData.store
              const manager = storeData.manager

              store.managerID = `
                ${manager.name} ${manager.lastName1} ${manager.lastName2}`
              return store
            })

          this.tableData = stores
        }
        else {
          console.log(response)
        }
      })
  }

  approveApplicant = () => {
    this.storeService.approveApplicant(this.selectedApplicantID)
      .subscribe((response) => {
        if (response.status === 'error') { alert(response.message) }
        else { window.location.reload() }
      })
  }

  rejectApplicant = () => {
    const observation = this.formsService.form.value.observation

    this.storeService.rejectApplicant(this.selectedApplicantID, observation)
      .subscribe((response) => {
        if (response.status === 'error') { alert(response.message) }
        else { window.location.reload() }
      })
  }

  onRowClicked = (applicantID: number) => {
    this.selectedApplicantID = applicantID
    this.selectedApplicantName = this.tableData.
      filter((store) => store.id === applicantID)[0].name

    this.openModal(this.content)
  }

  openModal = (content: any) => {
    this.modalService.open(content, {})
  }

  closeModal = () => {
    this.selectedApplicantID = -1
    this.selectedApplicantName = ''
    this.modalService.dismissAll()
  }
}

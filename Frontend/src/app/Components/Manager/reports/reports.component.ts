import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { CookieService } from 'ngx-cookie-service';

import { Component, OnInit } from '@angular/core'
import { ReportService } from 'src/app/Services/report.service'
import { SalePerClient, SalePerStore } from 'src/app/Interfaces/Reports'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  salesPerClientHTML?: HTMLElement
  salesPerStoreHTML?: HTMLElement

  groupedSalesPerClient: SalePerClient[][] = []
  salesPerStore: SalePerStore[] = []

  date: Date = new Date()

  constructor(
    private reportService: ReportService,
    protected cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.generateSalesPerClientReport()
    this.generateSalesPerStoreReport()
  }

  generateSalesPerClientReport = async () => {
    await this.reportService.getSalesPerClient()
      .then((response) => {
        const report = response.report

        const clientIDs = report
          .filter((entry, index, self) => (self.findIndex((v) => v.clientID === entry.clientID) === index))
          .map((entry) => entry.clientID)

        let groupedReport: SalePerClient[][] = []

        clientIDs.forEach((id) => {
          groupedReport.push(report.filter((entry) => entry.clientID === id))
        })

        this.groupedSalesPerClient = groupedReport
      })
  }

  generateSalesPerStoreReport = () => {
    this.reportService.getSalesPerStore()
      .then((response) => {
        this.salesPerStore = response.report
      })
  }

  downloadSalesPerClientReport = async () => {
    const salesPerClientHTML = document.getElementById('salesPerClient')!
    const salesPerStoreHTML = document.getElementById('salesPerStore')!

    salesPerClientHTML.style.display = 'block'
    salesPerStoreHTML.style.display = 'none'

    this.savePDF(salesPerClientHTML, 'Ventas por cliente')
  }

  downloadSalesPerStoreReport = () => {
    const salesPerClientHTML = document.getElementById('salesPerClient')!
    const salesPerStoreHTML = document.getElementById('salesPerStore')!

    salesPerClientHTML.style.display = 'none'
    salesPerStoreHTML.style.display = 'block'

    this.savePDF(salesPerStoreHTML, 'Ventas por afiliado')
  }

  savePDF = (HTMLContent: HTMLElement, documentTitle: string) => {
    const PDF = new jsPDF('p', 'pt', 'a4');
    PDF.html(HTMLContent, {
      width: PDF.internal.pageSize.getWidth(),
      windowWidth: 768,
      callback: (pdf: any) => {
        const originalPageCount = pdf.internal.getNumberOfPages()
        let pageCount = pdf.internal.getNumberOfPages()

        while ((pageCount - 1) > (originalPageCount - 10)) {
          pdf.deletePage(pageCount)
          pageCount = pdf.internal.getNumberOfPages()
        }

        pdf.save(documentTitle)
      }
    })
  }
}
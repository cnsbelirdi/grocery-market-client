import { ElementRef, Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { utils, writeFileXLSX } from 'xlsx';
import html2canvas from 'html2canvas';
import { ContactUs } from 'src/app/contracts/contact_us';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  constructor(private httpClientService: HttpClientService) {}

  async getCounts(
    table: string,
    successCallback?: (value) => void,
    errorCallback?: (errorMessage: string) => void
  ) {
    const observable: Observable<any> = this.httpClientService.get(
      {
        controller: 'public',
        action: 'GetCounts',
      },
      table
    );

    const promiseData = firstValueFrom(observable);
    promiseData.then((value) => successCallback(value)).catch((error) => {});

    return await promiseData;
  }

  async getCurrentUser(
    successCallback?: (value) => void,
    errorCallback?: (errorMessage: string) => void
  ) {
    const observable: Observable<any> = this.httpClientService.get({
      controller: 'public',
      action: 'getCurrentUser',
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then((value) => successCallback(value)).catch((error) => {});

    return await promiseData;
  }

  async getSalesByCategory(
    successCallback?: (value) => void,
    errorCallback?: (errorMessage: string) => void
  ) {
    const observable: Observable<any> = this.httpClientService.get({
      controller: 'public',
      action: 'GetTotalSalesByCategory',
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then((value) => successCallback(value)).catch((error) => {});

    return await promiseData;
  }

  async getTotalOrdersLast12Days(
    successCallback?: (value) => void,
    errorCallback?: (errorMessage: string) => void
  ) {
    const observable: Observable<any> = this.httpClientService.get({
      controller: 'public',
      action: 'GetTotalOrdersLast12Days',
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then((value) => successCallback(value)).catch((error) => {});

    return await promiseData;
  }

  async getIncomeExpenseByMonth(
    successCallback?: (value) => void,
    errorCallback?: (errorMessage: string) => void
  ) {
    const observable: Observable<any> = this.httpClientService.get({
      controller: 'public',
      action: 'GetIncomeExpenseByMonth',
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then((value) => successCallback(value)).catch((error) => {});

    return await promiseData;
  }

  async getWaitingOrders(successCallback?: (value) => void) {
    const observable: Observable<any> = this.httpClientService.get({
      controller: 'public',
      action: 'GetWaitingOrders',
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then((value) => successCallback(value)).catch((error) => {});

    return await promiseData;
  }

  async getNoStockProducts(successCallback?: (value) => void) {
    const observable: Observable<any> = this.httpClientService.get({
      controller: 'public',
      action: 'GetNoStockProducts',
    });
    const promiseData = firstValueFrom(observable);
    promiseData.then((value) => successCallback(value)).catch((error) => {});

    return await promiseData;
  }

  async contactUsMailSend(
    userMessage: ContactUs,
    successCallback?: (value) => void
  ) {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'public',
        action: 'UserSendMessage',
      },
      userMessage
    );
    const promiseData = firstValueFrom(observable);
    promiseData.then((value) => successCallback(value)).catch((error) => {});

    return await promiseData;
  }

  generateExcelFile(data: any[], filename: string) {
    const name = filename + '.xlsx';
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFileXLSX(wb, name);
  }

  printBill(bill: ElementRef) {
    html2canvas(bill.nativeElement).then((canvas) => {
      // Canvas'i PNG görüntüsüne dönüştürme
      const imgData = canvas.toDataURL('image/png');
      // Yeni bir pencere açma
      const printWindow = window.open('', '_blank');
      printWindow.document.open();
      // PNG görüntüsünü yeni pencerede görüntüleme
      const img = new Image();
      img.onload = () => {
        printWindow.document.write(`
          <html>
            <body>
              <img src="${img.src}" style="max-width: 100%;">
              <script type="text/javascript">
                window.onload = function() {
                  window.print();
                }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
        // Yeni pencereyi yazıcıdan print alma
        // printWindow.print(); -> Bu satır artık gerekli değil
        printWindow.onafterprint = () => {
          printWindow.close();
        };
      };
      img.src = imgData;
    });
  }
}

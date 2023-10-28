import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ProductListComponent } from './product-list/product-list.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { PublicService } from 'src/app/services/common/public.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
})
export class MarketplaceComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private publicService: PublicService
  ) {
    super(spinner);
  }
  tableRowCounts: number[] = [];
  async ngOnInit() {
    this.showSpinner(SpinnerType.BallAtom);
    this.tableRowCounts = await this.publicService.getCounts('products');
  }

  @ViewChild(ProductListComponent) listComponents: ProductListComponent;

  createdProduct(createdProduct: Create_Product) {
    this.listComponents.getProducts();
  }
}

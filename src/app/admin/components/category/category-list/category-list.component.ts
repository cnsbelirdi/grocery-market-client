import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Category } from 'src/app/contracts/category/list_category';
import { CreateCategoryDialogComponent } from 'src/app/dialogs/create-category-dialog/create-category-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { PublicService } from 'src/app/services/common/public.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private dialogService: DialogService,
    private categoryService: CategoryService,
    private toastrService: ToastrNotifyService,
    private publicService: PublicService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = ['id', 'name', 'createdDate', 'delete'];
  dataSource: MatTableDataSource<List_Category>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() createdCategory = new EventEmitter();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async ngOnInit() {
    await this.getCategories();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.hideSpinner(SpinnerType.BallAtom);
  }

  async getCategories() {
    this.showSpinner(SpinnerType.BallAtom);
    const allCategories: {
      totalCategoryCount: number;
      categories: List_Category[];
    } = await this.categoryService.getAllCategories(
      -1,
      -1,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
      },
      (errorMessage) =>
        this.toastrService.message(errorMessage, 'Error', {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        })
    );
    this.dataSource = new MatTableDataSource<List_Category>(
      allCategories.categories
    );
  }

  createCategory() {
    this.dialogService.openDialog({
      componentType: CreateCategoryDialogComponent,
      data: this.createdCategory,
      options: {
        width: '750px',
      },
      afterClosed: () => {},
    });
  }
  exportData() {
    this.publicService.generateExcelFile(this.dataSource.data, 'categories');
  }
}

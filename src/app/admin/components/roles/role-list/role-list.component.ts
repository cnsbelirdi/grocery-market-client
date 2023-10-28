import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Role } from 'src/app/contracts/role/list_role';
import { CreateRoleDialogComponent } from 'src/app/dialogs/create-role-dialog/create-role-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { RoleService } from 'src/app/services/common/models/role.service';
import { PublicService } from 'src/app/services/common/public.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private dialogService: DialogService,
    private roleService: RoleService,
    private toastrService: ToastrNotifyService,
    private publicService: PublicService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = ['id', 'name', 'delete'];
  dataSource: MatTableDataSource<List_Role>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() createdRole = new EventEmitter();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async ngOnInit() {
    await this.getRoles();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.hideSpinner(SpinnerType.BallAtom);
  }

  async getRoles() {
    this.showSpinner(SpinnerType.BallAtom);
    const allRoles: {
      totalRoleCount: number;
      datas: List_Role[];
    } = await this.roleService.getRoles(
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
    this.dataSource = new MatTableDataSource<List_Role>(allRoles.datas);
  }

  createRole() {
    this.dialogService.openDialog({
      componentType: CreateRoleDialogComponent,
      data: this.createdRole,
      options: {
        width: '750px',
      },
      afterClosed: () => {},
    });
  }

  exportData() {
    this.publicService.generateExcelFile(this.dataSource.data, 'roles');
  }
}

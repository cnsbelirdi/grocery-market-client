import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_User } from 'src/app/contracts/users/list_user';
import { AuthorizeUserDialogComponent } from 'src/app/dialogs/authorize-user-dialog/authorize-user-dialog.component';
import { CreateUserDialogComponent } from 'src/app/dialogs/create-user-dialog/create-user-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { PublicService } from 'src/app/services/common/public.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private dialogService: DialogService,
    private userService: UserService,
    private toastrService: ToastrNotifyService,
    private publicService: PublicService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'email',
    'fullname',
    'username',
    'phoneNumber',
    'role',
    'delete',
  ];
  dataSource: MatTableDataSource<List_User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() createdUser = new EventEmitter();

  async ngOnInit() {
    await this.getUsers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.hideSpinner(SpinnerType.BallAtom);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getUsers() {
    this.showSpinner(SpinnerType.BallAtom);
    const allUsers: { totalUserCount: number; users: List_User[] } =
      await this.userService.getAllUsers(
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
    this.dataSource = new MatTableDataSource<List_User>(allUsers.users);
  }

  createUser() {
    this.dialogService.openDialog({
      componentType: CreateUserDialogComponent,
      data: this.createdUser,
      options: {
        width: '750px',
      },
      afterClosed: () => {},
    });
  }

  assignRole(id: string) {
    this.dialogService.openDialog({
      componentType: AuthorizeUserDialogComponent,
      data: id,
      options: {
        width: '750px',
      },
      afterClosed: () => {
        this.toastrService.message('Roles assigned successfully', 'Success', {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        });
      },
    });
  }

  exportData() {
    this.publicService.generateExcelFile(this.dataSource.data, 'customers');
  }
}

import { Component, OnInit } from '@angular/core';
import { UpdateUserDialogComponent } from 'src/app/dialogs/update-user-dialog/update-user-dialog.component';
import { User } from 'src/app/entities/user';
import { DialogService } from 'src/app/services/common/dialog.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private dialogService: DialogService,
    private userService: UserService
  ) {}

  user: User;

  async ngOnInit() {
    this.getUserInfo();
  }

  async getUserInfo() {
    const name = localStorage.getItem('name');
    this.user = (await this.userService.getUserByName(name)).user;
  }

  change(type: string) {
    this.dialogService.openDialog({
      componentType: UpdateUserDialogComponent,
      data: { user: this.user, type: type },
      options: {
        width: '500px',
      },
      afterClosed: () => {
        this.getUserInfo();
      },
    });
  }
}

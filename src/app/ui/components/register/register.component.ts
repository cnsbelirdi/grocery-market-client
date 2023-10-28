import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/models/user.service';
import {
  ToastrMessageType,
  ToastrNotifyService,
  ToastrPosition,
} from 'src/app/services/common/toastr-notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrNotifyService,
    spinner: NgxSpinnerService
  ) {
    super(spinner);
  }

  frm: FormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group(
      {
        fullname: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ],
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.maxLength(25),
            Validators.minLength(6),
          ],
        ],
        email: [
          '',
          [Validators.required, Validators.maxLength(250), Validators.email],
        ],
        phoneNumber: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(3)]],
        passwordConfirm: ['', [Validators.required]],
      },
      {
        validators: (group: AbstractControl): ValidationErrors | null => {
          let password = group.get('password').value;
          let passwordConfirm = group.get('passwordConfirm').value;
          return password === passwordConfirm ? null : { notSame: true };
        },
      }
    );
  }

  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;

  async onSubmit(user: User) {
    this.submitted = true;

    if (this.frm.invalid) return;

    const result: Create_User = await this.userService.create(user);

    if (result.succeeded) {
      this.showSpinner(SpinnerType.BallAtom);
      this.toastrService.message(result.message, 'User Created', {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight,
      });
      this.router.navigate(['../login']);
    } else {
      this.showSpinner(SpinnerType.BallAtom);
      this.toastrService.message(result.message, 'Error', {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight,
      });
    }

    this.hideSpinner(SpinnerType.BallAtom);
  }
}

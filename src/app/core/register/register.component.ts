import { Component, OnInit } from '@angular/core';
import { ACCOUNT } from 'src/app/entity/accounts/account.model';
import { AccountService } from 'src/app/entity/accounts/account.service';
import { AccountServiceService } from '../auth/account-service.service';
import { Auth } from '../guard.model';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  Accounts: ACCOUNT[] = [];
  account: Auth = {
    email: '',
    password: '',
  };
  isValidator: boolean = false;

  constructor(
    private accountServiceService: AccountServiceService,
    private accountService: AccountService,
    private toast: ToastrService,
    private publicService: ServiceService
  ) {}

  ngOnInit(): void {}
  setIsvalidator() {
    this.isValidator = !this.isValidator;
  }
  register() {
    this.accountService.getAccounts().subscribe((data) => {
      const result = data.filter(
        (accout, index) => this.account.email === accout.email
      );
      if (result.length > 0) {
        this.toast.error('Địa chỉ email đã tồn tại', 'Tạo tài khoản!');
      } else {
        const Acc = {
          id: this.publicService.Makeid(8),
          email: this.account.email,
          avatar: 'http://localhost:3000/public/images/user-avatar.png',
          nickName: '',
          gender: '',
          password: this.account.password,
          phone: '',
          role: 'USER',
        };

        this.accountService.addAccount(Acc).subscribe((result) => {
          this.toast.success('Thành công', 'Tạo tài khoản!');
          this.account = {
            email: '',
            password: '',
          };
        });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountServiceService } from '../auth/account-service.service';
import { StateServiceService } from '../auth/state-service.service';
import { Auth } from '../guard.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  account: Auth = {
    email: '',
    password: '',
  };
  error?: string;
  isValidator: boolean = false;

  constructor(
    private authService: AccountServiceService,
    private toastr: ToastrService,
    private stateService: StateServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  setIsvalidator() {
    this.isValidator = !this.isValidator;
  }
  login() {
    this.error = '';
    this.authService.login(this.account);
    this.authService.error$.subscribe((data) => {
      this.error = data;
    });
    setTimeout(() => {
      if (this.error !== '') {
        this.toastr.error(this.error, 'Đăng nhập !');
        // if login success after that go to page coffee is default.
      } else {
        this.toastr.success('Thành công', 'Đăng nhập !');
        this.goToDashboard();
      }
    }, 500);
  }

  goToDashboard() {
    let urlPre = this.stateService.getUrl();
    if (urlPre && urlPre !== '/login') {
      // if history path exits then go to it.
      this.router.navigate([urlPre]);
      this.stateService.storeUrl(null);
    } else {
      this.router.navigate(['/coffees']); // go to default to page coffees
    }
  }
}

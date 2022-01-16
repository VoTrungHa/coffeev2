import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from 'src/app/core/auth/account-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  src = '../../../assets/images/user-avatar.png';
  constructor(private accountServiceService: AccountServiceService) {}

  ngOnInit(): void {}

  logout() {
    this.accountServiceService.logout();
  }
}
